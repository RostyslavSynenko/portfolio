const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1 });

    return res.status(200).send({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Get a post
// @route   GET /api/post/:id
// @access  Public
const getPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({
        success: false,
        error: { message: 'Post not found' }
      });
    }

    return res
      .status(200)
      .send({ success: true, data: post });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res) => {
  try {
    const { tags, title, content, image } = req.body;

    const post = await Post.create({
      tags,
      title,
      content,
      image
    });

    return res
      .status(201)
      .send({ success: true, data: post });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(
        error => ({
          property: error.path,
          message: error.message
        })
      );

      return res
        .status(400)
        .send({ success: false, error: errors });
    } else {
      return res.status(500).send({
        success: false,
        error: { message: 'Server Error', error }
      });
    }
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res.status(200).send({
      success: true,
      data: updatedPost
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res.status(404).send({
        success: false,
        error: { message: 'No post found' }
      });
    }

    await post.remove();

    return res
      .status(200)
      .send({ success: true, data: post });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};
