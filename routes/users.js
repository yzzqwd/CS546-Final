const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    res.redirect('/posts');
});

router.post('/login', async (req, res) => {
    const input = req.body;
    const username = input['username'];
    const password = input['password'];
    let result = false;
    let user = {};
    
    try {
        user = await userData.getByUsername(username);
        result = await bcrypt.compare(password, user.hashedPassword);
    } catch (e) {
        console.log('Username is not existed!');
    }

    if (result) {
        req.session.user = {username: username, userId: user._id};
        res.redirect('/posts');
    } else {
        res.render('login', {
            error: true
        });
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('logout');
});

module.exports = router;