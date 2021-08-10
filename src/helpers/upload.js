const multer = require("multer");
const maxSize = 2 * 1024 * 1024;
const mime = require('mime');
const fs = require('fs');

// let storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, __basedir + "/resources/static/assets/uploads/");
//   },
//   filename: (req, file, cb) => {
//     console.log(file.originalname);
//     cb(null, file.originalname);
//   },
// });

// let uploadFile = multer({
//   storage: storage,
//   limits: {
//     fileSize: maxSize
//   },
// }).single("file");


module.exports = function(data, fileName, folderName) {
  var decodedImg = decodeBase64Image(data);
  var imageBuffer = decodedImg.data;
  var type = decodedImg.type;
  var extension = mime.extension(type);

  try {
    const path = `/storage/images/${folderName}/${fileName}.${type}`;
    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, {
        recursive: true
      });
    }

    fs.writeFileSync(path, imageBuffer, 'utf8');
    return path;
  } catch (e) {
    console.log(e)
  }
}


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};

  if (matches && matches.length !== 3) {
    return new Error('Invalid input string');
  }

  response.type = 'png';
  response.data = new Buffer.from(dataString, 'base64');

  return response;
}