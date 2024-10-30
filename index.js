const express = require('express');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

// Set up Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    return cb(null, './uploads'); // Specify the upload directory
  },
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${path.extname(file.originalname)}`); // Generate a unique filename
  }
});

// Create the Multer upload instance
const upload = multer({ storage });

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Route to handle file upload
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  res.send(`File uploaded: ${req.file.filename}`);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});