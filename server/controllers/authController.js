const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const User = require('../models/User');

// @desc    Auth a user
// @route   POST /api/auth
// @access  Public
const authUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({
        success: false,
        error: { message: 'Please enter all fields' }
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).send({
        success: false,
        error: { message: 'User does not exits' }
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).send({
        success: false,
        error: {
          message: 'Invalid credentials'
        }
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || 3600 }
    );

    return res.status(200).send({
      success: true,
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        message: error.message
          ? error.message
          : 'Server Error',
        error
      }
    });
  }
};

// @desc    Get user data
// @route   GET /api/auth/user
// @access  Private
const validateUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select(
      '-password'
    );

    if (!user) {
      throw Error('User Does not exist');
    }

    return res
      .status(200)
      .send({ success: true, data: user });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: {
        message: error.message
          ? error.message
          : 'Server Error',
        error
      }
    });
  }
};

module.exports = { authUser, validateUser };
