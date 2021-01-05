const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const path = require('path');
const crypto = require('crypto');

const { getGfs } = require('../config/db');

const storage = new GridFsStorage({
  url: process.env.MONGO_URI,
  options: { useUnifiedTopology: true },
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }

        const filename =
          buf.toString('hex') +
          path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'images'
        };

        resolve(fileInfo);
      });
    });
  }
});

const upload = multer({ storage });

// @desc    Get all files
// @route   GET /api/images/files
// @access  Public
const getFiles = (req, res) => {
  try {
    const gfs = getGfs();

    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).send({
          error: 'No files exist'
        });
      }

      return res.status(200).send({ success: true, files });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: 'Server Error' });
  }
};

// @desc    Get a file
// @route   GET /api/images/files/:filename
// @access  Public
const getFile = (req, res) => {
  try {
    const gfs = getGfs();

    const { filename } = req.params;

    gfs.files.findOne({ filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).send({
          success: false,
          error: 'No file exist'
        });
      }

      return res.status(200).send({ success: true, file });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: 'Server Error' });
  }
};

// @desc    Get an image
// @route   GET /api/images/:filename
// @access  Public
const getImage = (req, res) => {
  try {
    const gfs = getGfs();

    const { filename } = req.params;

    gfs.files.findOne({ filename }, (err, file) => {
      if (!file || file.length === 0) {
        return res.status(404).send({
          success: false,
          error: 'No file exist'
        });
      }

      if (/image\//.test(file.contentType)) {
        const readstream = gfs.createReadStream(filename);
        readstream.pipe(res);
      } else {
        res
          .status(404)
          .send({ success: false, error: 'Not an image' });
      }
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: 'Server Error' });
  }
};

// @desc    Create an image
// @route   POST /api/images
// @access  Private
const createImage = (req, res) => {
  try {
    return res
      .status(201)
      .send({ success: true, image: req.file });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: 'Server Error' });
  }
};

// @desc    Delete an image
// @route   DELETE /api/images/:id
// @access  Private
const deleteImage = (req, res) => {
  try {
    const gfs = getGfs();

    const { id } = req.params;

    gfs.remove({ _id: id, root: 'images' }, (
      err /*, gridStore*/
    ) => {
      if (err) {
        return res
          .status(404)
          .send({ success: false, error: err });
      }

      return res
        .status(200)
        .send({ success: true, image: id });
    });
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, error: 'Server Error' });
  }
};

module.exports = {
  getFiles,
  getFile,
  getImage,
  createImage,
  deleteImage,
  upload
};
