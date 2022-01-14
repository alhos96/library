const multer = require("multer");
const TYPE = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      if (req.route.path === "/add-author") {
        cb(null, "./src/public/images/authors");
      } else if (req.route.path === "/add-book") {
        cb(null, "./src/public/images/books");
      }
    },
    filename: (req, file, cb) => {
      const ext = TYPE[file.mimetype];
      cb(null, Math.floor(Math.random() * 10000) + 10000 + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!TYPE[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});
module.exports = fileUpload;
