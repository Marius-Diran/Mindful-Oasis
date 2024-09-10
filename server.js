const express = require("express");
const dotenv = require("dotenv").config();
const path = require("path");
const fileupload = require("express-fileupload");

// gives up access to even file and folder in the public folder
let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

module.exports = (req, res) => {
  app(req, res);
};

// route for the index/home page
app.get('/', (req, res) => {
  res.sendFile(path.join(initial_path, "index.html"));
})

// route for the blog editor
app.get('/editor', (req, res) => {
  res.sendFile(path.join(initial_path, "editor.html"));
})

// upload link
app.post('/upload', (req, res) => {
  let file = req.files.image;
  let date = new Date();
  // image name
  let imagename = date.getDate() + date.getTime() + file.name;
  // image upload path
  let path = 'public/uploads/' + imagename;

  // create upload
  file.mv(path, (err, result) => {
    if(err){
      throw err
    }else{
      // image upload path
      res.json(`uploads/${imagename}`)
    }
  })
})

const port = 5000;

// route for the blog
app.get('/:blog', (req, res) => {
  res.sendFile(path.join(initial_path, "blog.html"));
})

app.use((req, res) => {
  res.json("404");
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
})