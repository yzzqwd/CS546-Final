const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const healthData = data.health;
const bcrypt = require('bcryptjs');
const xss = require('xss');

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
        username: user.username,
        age: user.age,
        height: health.height,
        weight: health.weight,
        mc: health.medicalConditions,
        BMI: health.BMI,
        BF: health.BF
    });
});

router.get('/update', async (req, res) => {
    res.render('addhealth');
});

router.get('/updateUser', async (req, res) => {
    res.render('updateUser');
});

router.patch('/updateUser', async (req, res) => {
    const userId = req.session.user.userId;
    const input = xss(req.body);
    let firstname = input['firstname'];
    let lastname = input['lastname'];
    let email = input['email'];
    let gender = input['gender'];
    let city = input['city'];
    let state = input['state'];
    let age = input['age'];
    let password = input['password'];
    
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
    const userId = req.session.user.userId;
    const input = xss(req.body);
    let weight = input['weight'];
    let height = input['height'];
    let mc = input['mc'];
    let BMI = input['BMI'];
    let BF = input['BF'];
    

    if (!weight && !height && !mc && !BMI && !BF) {
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
            mc = oldHealth.medicalConditions;
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