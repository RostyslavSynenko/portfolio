const express = require('express');

const auth = require('../middleware/auth');

const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject
} = require('../controllers/projectController');

const router = express.Router();

router.get('/', getProjects);
router.post('/', auth, createProject);

router
  .get('/:id', getProject)
  .put('/:id', auth, updateProject)
  .delete('/:id', auth, deleteProject);

module.exports = router;
