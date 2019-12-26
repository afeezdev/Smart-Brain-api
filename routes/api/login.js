const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require('config');

//Item Model
const User = require('../../models/User');

// @route   POST api/auth
// @desc    Auth user
// @access  Public
router.post('/', (req, res) => {
	const { email, password } = req.body;

	// Simple validation
	if (!email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (!user) return res.status(400).json({ msg: 'User does not exist' });

		// Validate password
		bcrypt.compare(password, user.password).then((isMatch) => {
			if (!isMatch) return res.status(400).json({ msg: 'Invalid Password' });
			return res.json(user);
		});
	});
});

module.exports = router;
