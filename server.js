const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const fileupload = require("express-fileupload");

// Gives up access to even file and folder in the public folder
let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

// Route for the index/home page
app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
})

// Route for the blog editor
app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
})

// Upload link
app.post('/upload', (req, res) => {
  let file = res.file.image;
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})