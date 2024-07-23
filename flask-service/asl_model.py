from flask import Flask, request, jsonify
from flask_socketio import SocketIO, join_room, leave_room, send, emit
import base64
from io import BytesIO
import torch
from torchvision import transforms
from torch import nn
from torchvision.utils import save_image
import torch.nn.functional as F
from PIL import Image 
import os
import cv2
import numpy as np
import socket

class SimpleCNN(nn.Module):
    def __init__(self, num_classes=29):
        super(SimpleCNN, self).__init__()
        self.conv1 = nn.Conv2d(3, 32, 3, 1)
        self.conv2 = nn.Conv2d(32, 64, 3, 1)
        self.conv3 = nn.Conv2d(64, 128, 3, 1)
        self.fc1 = nn.Linear(128 * 23 * 23, 512)
        self.fc2 = nn.Linear(512, num_classes)
        self.dropout = nn.Dropout(0.5)
        self.pool = nn.MaxPool2d(2, 2)
    
    def forward(self, x):
        x = self.pool(F.relu(self.conv1(x)))
        x = self.pool(F.relu(self.conv2(x)))
        x = self.pool(F.relu(self.conv3(x)))
        x = x.view(-1, 128 * 23 * 23)  # Flatten the tensor
        x = F.relu(self.fc1(x))
        x = self.dropout(x)
        x = self.fc2(x)
        return x

def load_model():
    os.environ['CUDA_LAUNCH_BLOCKING'] = '1'
    device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
    
    MyModel = SimpleCNN()  # Define your model
    MyModel = torch.load('ASL_my_model_V1.0.1.pth', map_location=torch.device('cpu'))
    MyModel = MyModel.to(device)
    
    # Define transformations
    transform = transforms.Compose([
        transforms.Resize((200, 200)),
        transforms.ToTensor(),
        transforms.Normalize(mean=[0.485, 0.456, 0.406], std=[0.229, 0.224, 0.225]),
    ])
    
    class_names = ['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','del','nothing','space']
    print('ASL Model loaded!')
    return MyModel, transform, device, class_names

def predict_image(model, transform, device, class_names, image_base64):
        # Load the image
        image = Image.open(BytesIO(base64.b64decode(image_base64))).convert('RGB')
        image.save('image.png')
        # Preprocess the image
        image_tensor = transform(image).unsqueeze(0).to(device)
        save_image(image_tensor, 'tensor.png')
        # Set the model to evaluation mode
        model.eval()
        
        with torch.no_grad():
            # Make a prediction
            outputs = model(image_tensor)
            _, predicted = torch.max(outputs, 1)
            predicted_class = class_names[predicted.item()]
        
        return predicted_class

def extract_view(image_data, new_border_color=None, new_border_thickness=0):
    border_color = [0, 255, 255]
    nparr = np.frombuffer(base64.b64decode(image_data), np.uint8)
    image = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    hsv = cv2.cvtColor(image, cv2.COLOR_BGR2HSV)
    lower_color = np.array([border_color[0] - 10, 100, 100])
    upper_color = np.array([border_color[0] + 10, 255, 255])
    mask = cv2.inRange(hsv, lower_color, upper_color)
    contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
    
    for contour in contours:
        x, y, w, h = cv2.boundingRect(contour)
        if w > 50 and h > 50:
            # Remove the red border by cropping a few pixels inside the detected rectangle
            margin = 12  # Adjust this value to remove the red border as needed
            extracted_view = image[y+margin:y+h-margin, x+margin:x+w-margin]

            if new_border_color is not None and new_border_thickness > 0:
                # Add new border to the image
                extracted_view = cv2.copyMakeBorder(
                    extracted_view,
                    top=new_border_thickness,
                    bottom=new_border_thickness,
                    left=new_border_thickness,
                    right=new_border_thickness,
                    borderType=cv2.BORDER_CONSTANT,
                    value=new_border_color
                )

            _, buffer = cv2.imencode('.png', extracted_view)
            return base64.b64encode(buffer).decode('utf-8')
    return None

app = Flask(__name__)
socketio = SocketIO(app, cors_allowed_origins="*", max_http_buffer_size=10 * 1024 * 1024)
model, transform, device, class_names = load_model()

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data['image']
        
        extracted_image = extract_view(image_data)
        if not extracted_image:
            return jsonify({'error': 'Failed to extract view'}), 400
        prediction = predict_image(model, transform, device, class_names, extracted_image)
        
        return jsonify({"prediction": prediction})
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500
        
@app.route('/')
def index():
    return "Flask server is running"

@socketio.on('connect')
def handle_connect():
    print(f'{request.sid} has connected')

@socketio.on('disconnect')
def handle_disconnect():
    print(f'{request.sid} has disconnected')

@socketio.on('join')
def handle_join(data):
    roomId = data['roomId']
    join_room(roomId)
    print(f'{request.sid} has entered the room {roomId}')

@socketio.on('leave')
def handle_leave(data):
    roomId = data['roomId']
    leave_room(roomId)
    print(f'{request.sid} has left the room {roomId}')

@socketio.on('send_image')
def handle_send_image(data):
    roomId = data['roomId']
    image = data['image']
    extracted_image = extract_view(image)
    if not extracted_image:
        with open("extraction_failure.txt","w+") as f:
            f.write(str(image))
        print("Failed to extract image!")
    prediction = predict_image(model, transform, device, class_names, extracted_image)
    print('Predicted: ', prediction)
    emit('message', {'prediction': prediction}, room=roomId)

@socketio.on('send_voice')
def handle_send_voice(data):
    roomId = data['roomId']
    text = data['text']
    emit('voice_text', {'text': text}, room=roomId)

def get_ip():
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    s.settimeout(0)
    try:
        # doesn't even have to be reachable
        s.connect(('10.254.254.254', 1))
        ip = s.getsockname()[0]
    except Exception:
        ip = '127.0.0.1'
    finally:
        s.close()
    return ip

if __name__ == '__main__':
    ip_address = get_ip()
    port = 5000
    print(f'Server running on http://{ip_address}:{port}')
    socketio.run(app, host='0.0.0.0', port=port)
