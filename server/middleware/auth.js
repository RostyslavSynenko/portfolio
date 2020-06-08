const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  try {
    const token = req.header('x-auth-token');

    if (!token) {
      return res.status(401).send({
        success: false,
        error: { message: 'No token. Authorization denied' }
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(400).send({
      success: false,
      error: {
        message: error.message
      }
    });
  }
};

module.exports = auth;
