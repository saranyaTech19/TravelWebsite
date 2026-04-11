const express = require('express');
const multer = require('multer');
const path = require('path');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// Configure multer storage — saves to server/uploads/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'uploads'));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, unique);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedExt = /jpeg|jpg|png|webp|gif|pdf/;
  const allowedMime = /jpeg|jpg|png|webp|gif|pdf/;
  const ok = allowedExt.test(path.extname(file.originalname).toLowerCase()) && allowedMime.test(file.mimetype);
  cb(ok ? null : new Error('Only image and PDF files are allowed.'), ok);
};

const upload = multer({ 
  storage, 
  fileFilter, 
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

// POST /api/upload  (admin only)
router.post('/', verifyToken, upload.single('file'), (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded.' });

  // Return the public URL — served from express static
  const publicUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ publicUrl });
});

module.exports = router;
