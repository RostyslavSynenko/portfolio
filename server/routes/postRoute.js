const express = require('express');

const auth = require('../middleware/auth');

const {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/postController');

const router = express.Router();

router.get('/', getPosts);
router.post('/', auth, createPost);

router.get('/:id', getPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;
