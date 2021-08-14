const multer = require("multer");
const dotenv = require('dotenv');
const mime = require('mime');
const fs = require('fs');
dotenv.config();

module.exports = async function(data, fileName, folderName) {
  var decodedImg = await decodeBase64Image(data);
  var imageBuffer = decodedImg.data;
  var type = decodedImg.type;
  // var extension = mime.extension(type);

  try {
    let path = `storage/images/${folderName}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true }, err => {
        console.log('err', err)
      });
    }

    path += `/${fileName}.${type}`;
    fs.writeFile(path, imageBuffer, 'base64', () => {});

    return `${process.env.BASE_URL || 'https://app.codeline.social'}/${path}`;
  } catch (e) {
    console.log(e)
  }
}


function decodeBase64Image(dataString) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};

  if (matches && matches.length !== 3) return new Error('Invalid input string');
  response.type = 'png';
  response.data = new Buffer.from(dataString, 'base64');

  return response;
}