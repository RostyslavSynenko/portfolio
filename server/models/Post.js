const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  tags: {
    type: [String]
  },
  date: {
    type: Date,
    default: Date.now
  },
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add some title']
  },
  imageUrl: {
    type: String,
    required: [true, 'Please add some image']
  }
});

module.exports = mongoose.model('Post', PostSchema);
