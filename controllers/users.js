const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const users = await User.find({}, 'username');
    res.render('users/index', { users });
});

router.get('/:userId', async (req, res) => {
    const user = await User.findById(req.params.userId).populate('pantry');
    res.render('users/show', { viewedUser: user, foods: user.pantry || [] });
});

module.exports = router;