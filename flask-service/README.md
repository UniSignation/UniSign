## Steps to set up the service:

### 1. Create virtual env
    python3 -m venv venv

### 2. Activate the virtual env
    source venv/bin/activate

### 3. Install the required dependencies
    pip install -r requirements.txt

### 4. Download the ASL model - [Link](https://drive.google.com/file/d/10KYDiE2QMSWSSks6pgJJu0xNLTbohLZ3/view?usp=drive_link)

### 5. Place the downloaded file in the following path
    flask-service/ASL_my_model_V1.0.1.pth

## Steps to run the service:

### 1. Activate the virtual env
    source venv/bin/activate

### 2. Run the service
    python3 asl_model.py