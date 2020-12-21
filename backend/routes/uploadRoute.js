import express from 'express';
import { createRequire } from 'module';
import multer from 'multer';
const require = createRequire(import.meta.url);
const cloudinary = require('cloudinary').v2;

const router = express.Router();

const storage = multer.diskStorage({
 destination: (req, file, callback) => {
  callback(null, './uploads');
 },
 filename: (req, file, callback) => {
  callback(null, file.originalname);
 },
});

let fileFilter = function (req, file, cb) {
 var allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];
 if (allowedMimes.includes(file.mimetype)) {
  cb(null, true);
 } else {
  cb(
   {
    success: false,
    message: 'Invalid file type. Only jpg, png image files are allowed.',
   },
   false
  );
 }
};

let obj = {
 storage: storage,
 limits: {
  fileSize: 200 * 1024 * 1024,
 },
 fileFilter: fileFilter,
};

router.post('/', (req, res) => {
 let upload = multer(obj).single('file'); // upload.single('file')
 upload(req, res, function (error) {
  if (error) {
   //instanceof multer.MulterError
   res.status(500);
   if (error.code == 'LIMIT_FILE_SIZE') {
    error.message = 'File Size is too large. Allowed file size is 200KB';
    error.success = false;
   }
   return res.json(error);
  } else {
   if (!req.file) {
    res.status(500);
    res.json('Please select an image to upload');
   }
   res.status(200).res.send(`/${req.file.path} File uploaded successfully`);
  }
 });
});

// Initialize the Cloudinary SDK
cloudinary.config({
 cloud_name: process.env.CLOUDINARY_NAME,
 api_key: process.env.CLOUDINARY_API_KEY,
 api_secret: process.env.CLOUDINARY_API_SECRET,
});

// UPLOAD TO CLOUDINARY

router.post('/', async (req, res) => {
 try {
  const fileStr = req.body.data;

  const uploadResponse = await cloudinary.uploader.upload(fileStr, {});
  console.log(uploadResponse);
  res.json({ msg: 'Image Uploaded' });
 } catch (err) {
  console.error(err);
  res.status(500).json({ err: 'Something went wrong' });
 }
});

export default router;
