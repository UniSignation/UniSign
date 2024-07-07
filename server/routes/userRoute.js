const express = require('express');
const router = express.Router();
const userController = require('../Controller/UserController.js');

router.get('/', userController.getAllUsers);
router.post('/getUser',userController.getUser);
router.post('/sign-up', userController.signUp);
router.post('/login', userController.login);
router.post('/sendEmail', userController.sendEmail);
router.post('/codeMatch', userController.codeMatch);
router.post('/updatePassword', userController.updatePassword);
router.post('/deleteCode', userController.deleteCode);





module.exports = router;
