const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const healthData = data.health;
const exerciseData = data.exercise;
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
    const username = input['un '];
    const password = input['pass'];
    const comfirm = input['pass2'];
    
    let hashedPassword;
    let usedUsername = false;

    if (!firstname || !lastname || !email || !gender || !city || !state || !age || !username || !password || !comfirm) {
        console.log("1")
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
        console.log("2")
        res.render('signup', {
            usedUsername: true
        });
        return;
    }

    if (password == comfirm) {
        hashedPassword = await bcrypt.hash(password, 15);
    } else {
        console.log("3")
        res.render('signup', {
            notComfirmed: true
        });
        return;
    }

    try {
        console.log("1")
        const user = await userData.create(firstname, lastname, username, gender, email, city, state, age, hashedPassword);
        console.log("2")
        await healthData.create(user._id);
        console.log("3")
        await exerciseData.create(user._id);
        console.log("4")
        req.session.user = {userId: user._id};
        console.log("5")
        res.redirect('/health');
    } catch (e) {
        //console.log("4")
        res.render('signup');
    }
})

module.exports = router; 