const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

//Item Model
const User = require('../../models/User');

// @route   GET api/users
// @desc    Get All users
// @access  Public, to be made private
router.get('/', (req, res) => {
	User.find().sort({ date: -1 }).select('-password').then((users) => res.json(users));
});


// @route   POST api/users
// @desc    Register a new user
// @access  Public
router.post('/', (req, res) => {
	const { name, email, password } = req.body;

	// Simple validation
	if (!name || !email || !password) {
		return res.status(400).json({ msg: 'Please enter all fields' });
	}

	// Check for existing user
	User.findOne({ email }).then((user) => {
		if (user) return res.status(400).json({ msg: 'user already exist' });

		const newUser = new User({
			name,
			email,
			password
		});

		// Create salt & hash
		bcrypt.genSalt(10, (err, salt) => {
			bcrypt.hash(newUser.password, salt, (err, hash) => {
				if (err) throw err;
				newUser.password = hash;
				newUser.save().then((user) => {
					return res.json(user);
				});
			});
		});
	});
});

module.exports = router;
