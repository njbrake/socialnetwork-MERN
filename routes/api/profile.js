const express = require('express');
const router = express.Router();

// @route   get request to api/profile/test
// @desc    tests profile route
// @access  Public

router.get('/test', (req, res) => res.json({
  msg: "profile works"
}));

module.exports = router;