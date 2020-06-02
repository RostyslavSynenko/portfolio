const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add some title']
  },
  description: {
    type: String,
    trim: true,
    required: [true, 'Please add some description']
  },
  technologies: {
    type: [String],
    required: [true, 'Please add some technology']
  },
  githubLink: {
    type: String,
    trim: true,
    required: [true, 'Please add GitHub link']
  },
  projectLink: {
    type: String,
    trim: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Project', ProjectSchema);
