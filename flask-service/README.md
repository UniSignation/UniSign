## Steps to run the service:

### 1. Create virtual env (first run only)
    python3 -m venv venv

### 2. Install the required dependencies (first run only)
    pip install -r requirements.txt

### 3. Download the ASL model - [Link](https://drive.google.com/file/d/10KYDiE2QMSWSSks6pgJJu0xNLTbohLZ3/view?usp=drive_link)

### 4. Place the downloaded file in the following path
    flask-service/ASL_my_model_V1.0.1.pth

### 5. Activate the virtual env
    source venv/bin/activate

### 6. Run the service
    python3 asl_model.py