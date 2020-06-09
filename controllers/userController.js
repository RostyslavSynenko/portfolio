const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { USER } = require('../config/userRole');

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).send({
        success: false,
        error: { message: 'Please enter all fields' }
      });
    }

    const user = await User.findOne({ email });

    if (user) {
      return res.status(400).send({
        success: false,
        error: { message: 'User already exists' }
      });
    }

    const salt = await bcrypt.genSalt(10);

    if (!salt) {
      throw Error('Something went wrong with bcrypt');
    }

    const hash = await bcrypt.hash(password, salt);

    if (!hash) {
      throw Error(
        'Something went wrong hashing the password'
      );
    }

    const newUser = new User({
      name,
      email,
      password: hash,
      role: USER
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { id: savedUser._id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || 3600 }
    );

    return res.status(201).send({
      success: true,
      data: {
        token,
        user: {
          _id: savedUser._id,
          name: savedUser.name,
          email: savedUser.email,
          role: savedUser.role
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

module.exports = { registerUser };
