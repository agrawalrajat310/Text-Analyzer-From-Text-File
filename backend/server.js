const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());

// Enable CORS for all routes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.post("/upload", upload.single("file"), (req, res) => {
  // Your file upload and word count logic here
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
