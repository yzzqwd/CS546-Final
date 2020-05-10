const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/private');
    } else {
        res.render('login');
    }
});

router.post('/login', async (req, res) => {
    const input = req.body;
    const username = input['nameProperty'];
    const password = input['nameProperty'];
    let result = false;
    try {
        const user = await userData.getByUsername(username);
        result = await bcrypt.compare(password, user.hashedPassword);
    } catch (e) {
        console.log(e);
    }
    if (result) {
        req.session.user = {username : username};
        res.redirect('/private');
    } else {
        res.status(401).render('login', {
            error: true
        });
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('logout');
});

module.exports = router;