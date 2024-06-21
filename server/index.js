const express = require('express');
const app = express();
const PORT = 3000;

const { sequelize } = require('./models/db');
const Users = require('./models/users');
const Rooms = require('./models/rooms');
const bcrypt = require('bcrypt');
const os = require('os');

// const cors = require('cors');
// app.use(cors());
app.use(express.json());

const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address;
      }
    }
  }
  return '127.0.0.1'; // Default to localhost if no external IP found
};

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Mock Video Call Service
app.post('/api/video-call', (req, res) => {
  res.json({ message: 'Video call initiated' });
});

// Mock Audio Transcription Service
app.post('/api/audio-transcription', (req, res) => {
  res.json({ transcription: 'This is a mock audio transcription' });
});

// Mock Video Transcription Service
app.post('/api/video-transcription', (req, res) => {
  res.json({ transcription: 'This is a mock video transcription' });
});

// Users
app.get('/db/users', async (req, res) => {
  const records = await Users.findAll();
  res.json(records);
});

app.post('/db/users/sign-up', async (req, res) => {
  try {
    if (userExists()){
      res.status(400).json('');
    }
    if (passwordsOk()) {
      
    } else {
      console.error('wrong password');
    }
    console.log(`User ${userEmail} created`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(`Error in user creation: ${error.message}`);
  }
});

app.post('/db/users/login', async (req, res) => {
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

// Rooms
app.get('/db/rooms', async (req, res) => {
  console.log('here');
  const records = await Rooms.findAll();
  return res.json(records);
});

app.get('/db/rooms/:roomId', async (req, res) => {
  const roomId = req.params.roomId;
  const room = await Rooms.findOne({ where: { roomId: roomId } });
  if (room) {
    console.log(`Room ${room.roomId} exists`);
    return res.status(200).json({ message: `Room ${room.roomId} exists` });
  }
  console.log(`Room ${roomId} does not exist`);
  return res.sendStatus(404);
  // return res.status(404).json({message: 'Not Found'})
});

app.post('/db/rooms/:roomId', async (req, res) => {
  try {
    const roomId = req.params.roomId;
    const newRecord = await Rooms.create({
      roomId: roomId,
    });
    res.status(201).json(newRecord);
    console.log(`Room ${roomId} created`);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.log(`Error in room creation: ${error.message}`);
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://${getLocalIpAddress()}:${PORT}/`);

  sequelize
    .sync()
    .then(() => {
      console.log('Database synchronized');
    })
    .catch((error) => {
      console.error('Error synchronizing database:', error);
    });
});
