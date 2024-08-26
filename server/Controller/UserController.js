const Users = require("../models/users");
const emailVerificationCodes = require("../models/emailVerificationCodes");
const bcrypt = require("bcrypt");
const sgMail = require("@sendgrid/mail");
const crypto = require("crypto");
const path = require("path");
const fs = require("fs");

exports.getAllUsers = async (req, res) => {
  try {
    const records = await Users.findAll({
      attributes: ["firstName", "lastName", "email"],
    });
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    let profileImage = req.file?.buffer || null;

    if (!profileImage) {
      // If no image is provided, use a default image
      const defaultImagePath = path.join(
        __dirname,
        "../",
        "assets",
        "profile.jpg"
      );
      profileImage = fs.readFileSync(defaultImagePath);
    }

    const newRecord = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      usesService: req.body.usesService,
      password: req.body.password,
      profileImage: profileImage, // שמירת הנתיב של התמונה
    });
    res.status(201).json(newRecord);
  } catch (error) {
    console.error("Error during signUp:", error);
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid password" });
    }

    // Password is correct, proceed with login
    res.json({ message: "Login successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUserWithoutPicture = async (req, res) => {
  console.log("get")
  try {
    const user = await Users.findOne({attributes: ["firstName", "lastName", "email"]},{ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sendEmail = async (req, res) => {
  try {
    const temporaryCode = crypto.randomBytes(3).toString("hex");
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    const email = req.body.email;

    await emailVerificationCodes.create({
      email: email,
      temporaryCode: temporaryCode,
      expiry: expiry,
    });

    const msg = {
      to: email, // list of receivers
      from: "unisignay@gmail.com", // sender address (verified sender)
      dynamic_template_data: {
        temporaryCode: temporaryCode,
      },
    };
    await sgMail.send(msg);

    return res.status(201).json({ mes: "You should receive an email" });
  } catch (error) {
    console.error("Caught error:", error);
    return res.status(500).json({ error: error.message });
  }
};

exports.codeMatch = async (req, res) => {
  try {
    const userCode = await emailVerificationCodes.findOne({
      where: { email: req.body.email },
    });
    if (!userCode) {
      return res.status(401).json({ error: "User not found" });
    }

    if (req.body.code !== userCode.temporaryCode) {
      return res.status(401).json({ error: "Code is not match" });
    }

    res.json({ message: "Code is match" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const updateRecord = await Users.update(
      {
        password: req.body.password,
      },
      {
        where: { email: req.body.email },
        individualHooks: true,
      }
    );
    if (updateRecord) {
      return res.status(200).json({ message: "Password updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCode = async (req, res) => {
  try {
    const updateRecord = await emailVerificationCodes.destroy({
      where: { email: req.body.email },
    });
    if (updateRecord) {
      return res.status(200).json({ message: "delete successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const updateRecord = await Users.update(
      {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
      },
      {
        where: { email: req.body.email },
      }
    );
    if (updateRecord) {
      return res
        .status(200)
        .json({ message: "User details updated successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const updateRecord = await Users.destroy({
      where: { email: req.body.email },
    });
    if (updateRecord) {
      return res.status(200).json({ message: "delete successfully" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.sendReport = async (req, res) => {

  try {
    const msg = {
      to: "unisignay@gmail.com",
      from: "unisignay@gmail.com",
      subject: "Report problem",
      
    };
    await sgMail.send(msg);

    return res.status(201).json({ mes: "You should receive an email" });
  } catch (error) {
    console.error("Caught error:", error);
    return res.status(500).json({ error: error.message });
  }
};
