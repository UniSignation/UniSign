const express = require("express");
const app = express();
const PORT = 3000;
const path = require("path");
const os = require("os");

const { sequelize } = require("./models/db");
const userRouters = require("./routes/userRoute");

const getLocalIpAddress = () => {
  const interfaces = os.networkInterfaces();
  for (const interfaceName in interfaces) {
    for (const iface of interfaces[interfaceName]) {
      if (iface.family === "IPv4" && !iface.internal) {
        return iface.address;
      }
    }
  }
  return "127.0.0.1"; // Default to localhost if no external IP found
};

// הגדרת נתיב לשרת קבצים סטטיים מתוך תיקיית 'uploads'
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Mock Video Call Service
app.post("/api/video-call", (req, res) => {
  res.json({ message: "Video call initiated" });
});

// Mock Audio Transcription Service
app.post("/api/audio-transcription", (req, res) => {
  res.json({ transcription: "This is a mock audio transcription" });
});

// Mock Video Transcription Service
app.post("/api/video-transcription", (req, res) => {
  res.json({ transcription: "This is a mock video transcription" });
});

// Use user routers
app.use("/user", userRouters);

app.listen(PORT, () => {
  console.log(`Server running at http://${getLocalIpAddress()}:${PORT}/`);

  sequelize
    .sync()
    .then(() => {
      console.log("Database synchronized");
    })
    .catch((error) => {
      console.error("Error synchronizing database:", error);
    });
});
