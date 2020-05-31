const mongoose = require('mongoose');

const Post = require('../models/Post');

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res, next) => {
  try {
    const posts = await Post.find();

    return res.status(200).send({
      success: true,
      count: posts.length,
      data: posts
    });
  } catch (error) {
    return res.status(500).send({ success: false, error });
  }
};

// @desc    Get a post
// @route   GET /api/post/:id
// @access  Public
const getPost = async (req, res, next) => {
  try {
    return res.status(200).send({});
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// @desc    Create a post
// @route   POST /api/posts
// @access  Private
const createPost = async (req, res, next) => {
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
      return res
        .status(500)
        .send({ error: 'Server Error' });
    }
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Private
const updatePost = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { post } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      post,
      { new: true }
    );

    return res
      .status(204)
      .send({ success: true, data: updatedPost });
  } catch (error) {
    return res.status(500).send({ error });
  }
};

// @desc    Delete a post
// @route   DELETE /api/posts/:id
// @access  Private
const deletePost = async (req, res, next) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    if (!post) {
      return res
        .status(404)
        .send({ success: false, error: 'No post found' });
    }

    await post.remove();

    return res
      .status(200)
      .send({ success: true, data: post });
  } catch (error) {
    return res.status(500).send({ error: 'Server Error' });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost
};
