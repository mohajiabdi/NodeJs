const express = require("express");
const multer = require("multer");
const path = require("path");

const app = express();

// Make uploads folder accessible from browser
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Single file upload route
app.post("/upload", upload.single("myFile"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("❌ No file uploaded!");
  }
  console.log("✅ Uploaded file:", req.file);
  res.send("✅ File uploaded successfully!");
});

// Start the server
app.listen(3000, () => console.log("🚀 Server running on port 3000"));
