const multer = require("multer");
const dotenv = require('dotenv');
const mime = require('mime');
const fs = require('fs');
dotenv.config();

module.exports = async function(data, fileName, folderName, isVideo = false) {
  var decodedImg = await decodeBase64(data, isVideo);
  var imageBuffer = decodedImg.data;
  var type = decodedImg.type;
  // var extension = mime.extension(type);

  try {
    let path = `storage/${isVideo? 'videos' : 'images'}/${folderName}`;

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true }, err => {
        console.log('err', err)
      });
    }

    path += `/${fileName}.${type}`;
    await fs.writeFile(path, imageBuffer, 'base64', () => {});

    return `${process.env.BASE_URL || 'https://app.codeline.social'}/${path}`;
  } catch (e) {
    console.log(e)
  }
}


function decodeBase64(dataString, isVideo = false) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};

  if (matches && matches.length !== 3) return new Error('Invalid input string');
  response.type = isVideo ? 'mp4' : 'png';
  dataString.replace(/ /g, '+');
  response.data = new Buffer.from(dataString, 'base64');

  return response;
}