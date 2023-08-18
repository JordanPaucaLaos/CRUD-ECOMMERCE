const multer = require("multer");

const imageFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Porfavor suba solo imagenes.", false);
  }
};

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/public/imagenes/productos/");
  },
  filename: (req, file, cb) => {
    cb(null, `${file.originalname}`);
  },
});

var uploadFile = multer({ storage: storage, fileFilter: imageFilter });
module.exports = uploadFile;
