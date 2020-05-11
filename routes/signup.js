const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    res.render('signup');
});

router.post('/', async (req, res) => {
    const input = req.body;
    const firstname = input['firstname'];
    const lastname = input['lastname'];
    const email = input['email'];
    const gender = input['gender'];
    const city = input['city'];
    const state = input['state'];
    const age = input['age'];
    const username = input['username'];
    const password = input['password'];
    const comfirm = input['confirm'];
    
    let hashedPassword;
    let usedUsername = false;

    if (!firstname || !lastname || !email || !gender || !city || ! state || !age || !username || !password || !comfirm) {
        res.render('signup', {
            miss: true
        });
        return;
    }

    try {
        await userData.getByUsername(username);
        usedUsername = true;
    } catch (e) {
        console.log(e);
    }

    if (usedUsername) {
        res.render('signup', {
            usedUsername: true
        });
        return;
    }

    if (password == comfirm) {
        hashedPassword = await bcrypt.hash(password, 15);
    } else {
        res.render('signup', {
            notComfirmed: true
        });
        return;
    }

    try {
        const user = await userData.create(firstname, lastname, username, gender, email, city, state, age, hashedPassword);
        req.session.user = {username: username, userId: user._id};
        res.redirect('/health');
    } catch (e) {
        res.render('signup');
    }
})

module.exports = router; 