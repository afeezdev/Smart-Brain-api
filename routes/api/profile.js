const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const User = require('../../models/User')

// @route   GET api/users/id
// @desc    Get  a user data
// @access   to be made Private
router.get('/:id', (req, res) => {
	User.findById(req.params.id)
		.select('-password')
		.then((user) => res.json(user))
		.catch((err) => res.status(404).json('User does not exist'));
});

module.exports = router;