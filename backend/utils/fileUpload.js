const multer = require("multer");
const path = require("path");
const { v4: uuid4 } = require("uuid")

// set storage
const storage = multer.diskStorage({
   destination: './uploads',
   filename: function (req, file, cb) {
      cb(null,  uuid4() + '-' + path.extname(file.originalname))
   }
})

// Initialize upload
const upload = multer({
   storage,
   limits: { fileSize: 10000000 },
   fileFilter: function (req, file, cb) {
      checkFileType(file, cb)
   }
})

// Check file for image
function checkFileType(file, cb) {
   const filetypes = /jpeg|jpg|png|gif/
   const extname = filetypes.test(path.extname(file.originalname).toLocaleLowerCase())

   const mimetype = filetypes.test(file.mimetype)

   if (mimetype && extname) {
      return cb(null, true)
   } else {
      cb('Error: You can only upload image files')
   }
}

module.exports = upload