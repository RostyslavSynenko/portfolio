const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  tags: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  },
  image: {
    type: String,
    required: [true, 'Please add some image']
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add some title']
  },
  content: {
    type: String,
    trim: true,
    required: [true, 'Please add some text']
  }
});

module.exports = mongoose.model('Post', PostSchema);
