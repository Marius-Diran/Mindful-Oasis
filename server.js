const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));

app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
})

app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})