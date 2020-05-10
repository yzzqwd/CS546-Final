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
    
    const hashedPassword;
    let usedUsername = false;

    if (!firstname || !lastname || !email || !gender || !city || ! state || !age || !username || !password || !comfirm) {
        res.render('signup', {
            miss: true,
            // usedUsername: false,
            // notComfirmed: false
        });
        return;
    }

    try {
        await userData.getByUsername(username);
        usedUsername = true;
    } catch (e) {
        console.log('The username can be used!');
    }

    if (usedUsername) {
        res.render('signup', {
            // miss: false,
            usedUsername: true,
            // notComfirmed: false
        });
        return;
    }

    if (password == comfirm) {
        hashedPassword = await bcrypt.hash(password, 15);
    } else {
        res.render('signup', {
            // miss: false,
            // usedUsername: false,
            notComfirmed: true
        });
        return;
    }

    try {
        await userData.create(firstname, lastname, username, gender, email, city, state, age, hashedPassword);
        res.render('login');
    } catch (e) {
        res.render('signup');
    }
})

module.exports = router; 