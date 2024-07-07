from flask import Flask, request, jsonify
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
# import logging

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

app = Flask(__name__)
# app.logger.setLevel(logging.ERROR)
model, transform, device, class_names = load_model()
    
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

def extract_view(image_data, border_color,):
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
            extracted_view = image[y:y+h, x:x+w]
            _, buffer = cv2.imencode('.png', extracted_view)
            return base64.b64encode(buffer)
    return None

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json()
        image_data = data['image']
        
        # for image extraction from android app
        # border_color_hsv = [0, 255, 255]
        # extracted_image = extract_view(image_data, border_color_hsv)
        # if not extracted_image:
        #     return jsonify({'error': 'Failed to extract view'}), 400
        # prediction = predict_image(model, transform, device, class_names, extracted_image)
        
        # regular testing
        if not image_data:
            return jsonify({'error': 'No image recieved'}), 400
        prediction = predict_image(model, transform, device, class_names, image_data)
        return jsonify({"prediction": prediction})
    except Exception as e:
        print(f"Exception: {e}")
        return jsonify({"error": str(e)}), 500
        
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
