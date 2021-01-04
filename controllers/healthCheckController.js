// @desc    Check health
// @route   GET /api/health
// @access  Public
const getHealth = async (req, res, next) => {
  return res.status(200).send('ok');
};

module.exports = { getHealth };
