const multer = require("multer");
const dotenv = require('dotenv');
const mime = require('mime');
const fs = require('fs');
dotenv.config();

module.exports = async function(data, fileName, folderName, fileType = 'image') {
  var decodedImg = await decodeBase64(data, fileType);
  var imageBuffer = decodedImg.data;
  var type = decodedImg.type;
  // var extension = mime.extension(type);
  const uploadedFileType = fileType === 'image' ? 'images' : (
      fileType === 'video' ? 'videos' : (
        fileType === 'audio' ? 'audios' : 'files'
      )
    );
  try {
    let path = `storage/${uploadedFileType}/${folderName}`;

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
};


function decodeBase64(dataString, fileType) {
  var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/),
  response = {};
  if (matches && matches.length !== 3) return new Error('Invalid input string');
  response.type = fileType === 'image' ? 'png' : (
    fileType === 'video' ? 'mp4': (
      fileType === 'audio' ? 'mp3' : 'pdf'
    )
  );
  response.data = new Buffer.from(dataString, 'base64');
  return response;
}