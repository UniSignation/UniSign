const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../uploads')); // שמור את התמונות בתיקיית 'uploads'
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '-' + file.originalname);
    }
  });
  
const upload = multer({ storage: storage });
router.get('/getAllUser', userController.getAllUsers);
router.post('/getUser', userController.getUser);
router.post('/sign-up', upload.single('profileImage'), userController.signUp);
router.post('/login', userController.login);
router.post('/sendEmail', userController.sendEmail);
router.post('/codeMatch', userController.codeMatch);
router.post('/updatePassword', userController.updatePassword);
router.post('/deleteCode', userController.deleteCode);
router.post('/updateUser', userController.updateUser);
router.post('/deleteUser', userController.deleteUser);
router.post('/sendReport', userController.sendReport);

module.exports = router;
