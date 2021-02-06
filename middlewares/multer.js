const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    console.log(file);
    const name = file.originalname
      .split(" ")
      .join("_")
      .replace(/.jpg|.jpeg|.png/gi, "");
    const extension = MIME_TYPE[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).fields([
  { name: "compagnyLogo", maxCount: 1 },
  { name: "compagnyCoverPhoto", maxCount: 1 },
  { name: "compagnyRepresentPhoto", maxCount: 1 },
  { name: "compagnyPresentationFile", maxCount: 1 },
]);
