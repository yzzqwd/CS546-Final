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