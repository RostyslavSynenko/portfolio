const Project = require('../models/Project');

// @desc    Get all projects
// @route   GET /api/projects
// @access  Public
const getProjects = async (req, res) => {
  try {
    const projects = await Project.find().sort({
      date: -1
    });

    return res
      .status(200)
      .send({ success: true, data: projects });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Get a project
// @route   GET /api/projects/:id
// @access  Public
const getProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send({
        success: false,
        error: { message: 'Project not found' }
      });
    }

    return res
      .status(200)
      .send({ success: true, data: project });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Create a project
// @route   POST /api/projects
// @access  Private
const createProject = async (req, res) => {
  try {
    const {
      title,
      description,
      technologies,
      githubLink,
      projectLink,
      image
    } = req.body;

    const project = await Project.create({
      title,
      description,
      technologies,
      githubLink,
      projectLink,
      image
    });

    return res
      .status(201)
      .send({ success: true, data: project });
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
        error: { message: 'Server Error', error }
      });
    }
  }
};

// @desc    Update a project
// @route   PUT /api/projects/:id
// @access  Private
const updateProject = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedProject = await Project.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    return res
      .status(200)
      .send({ success: true, data: updatedProject });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

// @desc    Delete a project
// @route   DELETE /api/projects/:id
// @access  Private
const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    const project = await Project.findById(id);

    if (!project) {
      return res.status(404).send({
        success: false,
        error: { message: 'No project found' }
      });
    }

    await project.remove();

    return res
      .status(200)
      .send({ success: true, data: project });
  } catch (error) {
    return res.status(500).send({
      success: false,
      error: { message: 'Server Error', error }
    });
  }
};

module.exports = {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
};
