const Users = require('../models/users');
const emailVerificationCodes = require('../models/emailVerificationCodes')
const bcrypt = require('bcrypt');
const sgMail = require('@sendgrid/mail');
const crypto = require('crypto');

exports.getAllUsers = async (req, res) => {
  try {
    const records = await Users.findAll();
    res.json(records);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.signUp = async (req, res) => {
  try {
    const newRecord = await Users.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      usesService: req.body.usesService,
      password: req.body.password
    });
    res.status(201).json(newRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Password is correct, proceed with login
    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await Users.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }
    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


exports.sendEmail = async (req, res) => {
  // key
  try {
    const temporaryCode = crypto.randomBytes(3).toString('hex');
    const expiry = new Date(Date.now() + 5 * 60 * 1000);
    const email = req.body.email;

    await emailVerificationCodes.create({
      email: email,
      temporaryCode: temporaryCode,
      expiry: expiry,
    });

    const msg = {
      to: email, // list of receivers
      from: 'unisignay@gmail.com', // sender address (verified sender)
      templateId: '',
      dynamic_template_data: {
        temporaryCode: temporaryCode
      }
    };
    await sgMail.send(msg);

    return res.status(201).json({ mes: "You should receive an email" });
  } catch (error) {
    console.error("Caught error:", error);
    return res.status(500).json({ error: error.message });
  }
};
