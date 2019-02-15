const multer = require('multer');
const maxSize = 1 * 1024 * 1024;
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    callback(null, 'public/');
  },
  filename: function(req, file, callback) {
    callback(null, Date.now() + file.originalname.toString());
  },

});
module.exports = multer({ storage: storage,limits: { fileSize: maxSize }});