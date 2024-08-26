const express = require("express");
const router = express.Router();
const userController = require("../Controller/UserController.js");
const multer = require("multer");
const path = require("path");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.get("/getAllUser", userController.getAllUsers);
router.post("/getUser", userController.getUser);
router.post("/getUserWithoutPicture", userController.getUserWithoutPicture);
router.post("/sign-up", upload.single("profileImage"), userController.signUp);
router.post("/login", userController.login);
router.post("/sendEmail", userController.sendEmail);
router.post("/codeMatch", userController.codeMatch);
router.post("/updatePassword", userController.updatePassword);
router.post("/deleteCode", userController.deleteCode);
router.post("/updateUser", userController.updateUser);
router.post("/deleteUser", userController.deleteUser);
router.post("/sendReport", userController.sendReport);

module.exports = router;
