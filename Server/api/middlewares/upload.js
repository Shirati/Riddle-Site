const multer = require('multer');

const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, false);
  } else {
    cb(new Error('Only .jpeg or .png files are accepted'), true);
  }
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
  fileFilter
});
// const upload=multer({
//     // dest: 'uploads/',
//   storage:storage,
//     limits:{
//         fileSize:1024*1024*2
//     },
//   fileFilter:  fileFilter
// });
const upload = multer({ storage: storage });

module.exports = upload;