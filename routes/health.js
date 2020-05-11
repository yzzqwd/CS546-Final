const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const healthData = data.health;

router.get('/', async (req, res) => {
    const userId = req.session.user.userId;
    let user = {};
    let health = {};

    try {
        user = await userData.getByUsername(req.session.user.username);
    } catch (e) {
        console.log(e);
    }

    try {
        health = await healthData.get(userId);
    } catch (e) {
        console.log(e);
    }

    res.render('health', {
        user: user,
        health: health
    });
})

router.get('/add', async (req, res) => {
    res.render('addhealth');
});

router.post('/add', async (req, res) => {
    const input = req.body;
    const weight = input['weight'];
    const height = input['height'];
    const mc = input['mc'];
    const BMI = input['BMI'];
    const BF = input['BF'];
    const userId = req.session.user.userId;

    if (!health || !height || !mc || !BMI || !BF) {
        res.render('addhealth', {
            miss: true
        });
        return;
    }

    try {
        await healthData.create(userId, height, weight, mc, BMI, BF);
        res.redirect('/health');
    } catch (e) {
        res.render('addhealth');
    }
});