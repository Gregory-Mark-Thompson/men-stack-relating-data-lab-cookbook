const express = require('express');
const router = express.Router();

const User = require('../models/user.js');

router.get('/', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    res.render('foods/index', {
        foods: user.pantry || [],
        user: req.session.user,
    });
});

router.get('/new', async (req, res) => {
    res.render('foods/new.ejs', { user: req.session.user });
});

router.post('/', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    user.pantry.push(req.body);
    await user.save();
    res.redirect('/');
});

router.delete('/:itemId', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    user.pantry.pull({ _id: req.params.itemId });
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
});

router.get('/:itemId/edit', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const food = await user.pantry.id(req.params.itemId);
    res.render('foods/edit', { food, user: req.session.user });
});

router.put('/:itemId', async (req, res) => {
    const user = await User.findById(req.session.user._id);
    const food = user.pantry.id(req.params.itemId);
    food.name = req.body.name;
    await user.save();
    res.redirect(`/users/${req.session.user._id}/foods`);
});

module.exports = router;