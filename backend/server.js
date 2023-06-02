const express = require("express");
const multer = require("multer");
const fs = require("fs");
const app = express();

const upload = multer({ dest: "uploads/" });

app.use(express.static("public"));
app.use(express.json());

app.post("/upload", upload.single("file"), (req, res) => {
  const filePath = req.file.path;
  const fileContent = fs.readFileSync(filePath, "utf-8");
  const words = fileContent.match(/\b\w+\b/g);
  const wordCounts = {};

  for (const word of words) {
    const lowercaseWord = word.toLowerCase();
    wordCounts[lowercaseWord] = (wordCounts[lowercaseWord] || 0) + 1;
  }

  fs.unlinkSync(filePath);

  const wordCountArray = Object.entries(wordCounts).map(([word, count]) => ({
    word,
    count,
  }));

  res.json(wordCountArray);
});

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
