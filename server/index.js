const express = require('express');
const app = express();
const PORT = 3000;
const path = require('path');

const { sequelize } = require('./models/db');
const userRouters = require('./routes/userRoute');

// הגדרת נתיב לשרת קבצים סטטיים מתוך תיקיית 'uploads'
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
});

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

// Use user routers
app.use('/user', userRouters);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);

  sequelize.sync().then(() => {
    console.log('Database synchronized');
  }).catch((error) => {
    console.error('Error synchronizing database:', error);
  });
});
