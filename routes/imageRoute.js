const express = require('express');

const auth = require('../middleware/auth');

const {
  getFiles,
  getFile,
  getImage,
  createImage,
  deleteImage,
  upload
} = require('../controllers/imageController');

const router = express.Router();

router.get('/files', getFiles);
router.delete('/files/:id', auth, deleteImage);
router.get('/files/:filename', getFile);
router.post(
  '/files',
  auth,
  upload.single('image'),
  createImage
);

router.route('/:filename').get(getImage);

module.exports = router;
