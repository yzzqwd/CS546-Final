const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const healthData = data.health;
const bcrypt = require('bcryptjs');

router.get('/', async (req, res) => {
    const userId = req.session.user.userId;
    let user = {};
    let health = {};

    try {
        user = await userData.get(userId);
        health = await healthData.get(userId);
    } catch (e) {
        console.log(e);
    }

    res.render('health', {
        user: user,
        health: health
    });
});

router.get('/update', async (req, res) => {
    res.render('addhealth');
});

router.get('/updateUser', async (req, res) => {
    res.render('updateUser');
});

router.patch('/updateUser', async (req, res) => {
    const input = req.body;
    const firstname = input['firstname'];
    const lastname = input['lastname'];
    const email = input['email'];
    const gender = input['gender'];
    const city = input['city'];
    const state = input['state'];
    const age = input['age'];
    const password = input['password'];
    const userId = req.session.user.userId;

    if (!firstname && !lastname && !email && !gender && !city && ! state && !age && !password) {
        res.render('signup', {
            blank: true
        });
        return;
    }

    try {
        const oldUser = await userData.get(userId);
        const username = oldUser.username;
        const posts = oldUser.posts;
        const group_id = oldUser.group_id;
        if (!firstname) {
            firstname = oldUser.firstname;
        }
        if (!lastname) {
            lastname = oldUser.lastname;
        }
        if (!email) {
            email = oldUser.email;
        }
        if (!gender) {
            gender = oldUser.gender;
        }
        if (!age) {
            age = oldUser.age;
        }
        if (!city) {
            city = oldUser.city;
        }
        if (!state) {
            state = oldUser.state;
        }
        if (!password) {
            password = oldUser.hashedPassword;
        } else {
            password = await bcrypt.hash(password, 15);
        }
        await userData.updateUser(userId, firstName, lastName, username, gender, email, city, state, age, password, posts, group_id);
        res.redirect('/health');
    } catch (e) {
        res.render('updateUser');
    }
});

router.patch('/update', async (req, res) => {
    const input = req.body;
    const weight = input['weight'];
    const height = input['height'];
    const mc = input['mc'];
    const BMI = input['BMI'];
    const BF = input['BF'];
    const userId = req.session.user.userId;

    if (!health && !height && !mc && !BMI && !BF) {
        res.render('addhealth', {
            blank: true
        });
        return;
    }

    try {
        const oldHealth = await healthData.get(userId);
        if (!weight) {
            weight = oldHealth.weight;
        }
        if (!height) {
            height = oldHealth.height;
        }
        if (!mc) {
            mc = oldHealth.mc;
        }
        if (!BMI) {
            BMI = oldHealth.BMI;
        }
        if (!BF) {
            BF = oldHealth.BF;
        }
        await healthData.updateHealth(userId, height, weight, mc, BMI, BF);
        res.redirect('/health');
    } catch (e) {
        res.render('addhealth');
    }
});

module.exports = router;