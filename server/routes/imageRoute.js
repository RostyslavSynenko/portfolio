const express = require('express');

const {
  getFiles,
  getFile,
  getImage,
  createImage,
  deleteImage,
  upload
} = require('../controllers/imageController');

const router = express.Router();

router.route('/files').get(getFiles);
router.route('/files/:id').delete(deleteImage);
router.route('/files/:filename').get(getFile);
router.post('/files', upload.single('image'), createImage);

router.route('/:filename').get(getImage);

module.exports = router;
