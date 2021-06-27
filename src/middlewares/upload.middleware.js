const multer = require("multer");
const maxSize = 2 * 1024 * 1024;

const uploadFile = (fileName, dest) => {
  let storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, __basedir + "/public/uploads/" + dest);
    },
    filename: (req, file, cb) => {
      console.log(fileName);
      cb(null, fileName);
    },
  });

  let File = multer({
    storage: storage,
    limits: {
      fileSize: maxSize
    },
  }).single("file");
}

module.exports = uploadFile;
