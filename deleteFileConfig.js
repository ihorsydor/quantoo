const fs = require("fs");
const path = require("path");

const deleteFile = (filename)=>{

    console.log("tu jest")
const imagePath = path.join(__dirname, "./images", filename);
fs.unlink(imagePath, (err) => {
  if (err) {
    console.error(err);
  }
  console.log("File deleted");
});}

module.exports = {deleteFile}