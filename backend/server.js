const express = require('express');
const multer = require('multer');
const fs = require('fs');
const cors = require('cors');
const app = express();

const upload = multer({ dest: 'uploads/' });

app.use(express.static('public'));
app.use(express.json());

// Enable CORS for all routes
app.use(cors());

app.post('/upload', upload.single('file'), (req, res) => {
  // Your file upload and word count logic here
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
