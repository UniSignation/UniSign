const express = require('express');
const app = express();
const PORT = 3000;

const { sequelize } = require('./models/db');
const Users = require('./models/users');
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// Mock Video Call Service
app.post('/api/video-call', (req, res) => {
  res.json({ message: "Video call initiated" });
});

// Mock Audio Transcription Service
app.post('/api/audio-transcription', (req, res) => {
  res.json({ transcription: "This is a mock audio transcription" });
});

// Mock Video Transcription Service
app.post('/api/video-transcription', (req, res) => {
  res.json({ transcription: "This is a mock video transcription" });
});


app.get('/db/users', async (req, res) => {
  const records = await Users.findAll();
  res.json(records);
});

app.post('/db/users', async (req, res) => {
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
});

app.post('/db/login', async (req, res) => {
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
});


app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);

  sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Error synchronizing database:', error);
  });

});