const multer = require("multer");

const MIME_TYPE = {
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
  "image/png": "png",
  "application/pdf": "pdf",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx",
};
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "public/xlImport");
  },
  filename: (req, file, callback) => {
    const name = file.originalname
      .split(" ")
      .join("_")
      .replace(/.jpg|.jpeg|.png|.xlsx/gi, "");
    const extension = MIME_TYPE[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage: storage }).fields([
  { name: "xlFile", maxCount: 1 },
]);
