const express = require('express');
const router = express.Router();
const data = require('../data');
const exerciseData = data.exercise;
const xss = require('xss');

router.get('/', async (req, res) => {
    const userId = req.session.user.userId;
    let exercise = {};

    try {
        exercise = await exerciseData.get(userId);
    } catch (e) {
        console.log(e);
    }

    res.render('exercise', {
        indoors: exercise.indoors,
        outdoors: exercise.outdoors,
        other: exercise.others
    });
});

router.get('/add', async (req, res) => {
    res.render('addexercise');
});

router.patch('/add', async (req, res) => {
    const type = xss(req.body['type']);
    const sport = xss(req.body['sport']);
    const userId = req.session.user.userId;

    if (!type || !sport) {
        res.render('addexercise', {
            miss: true
        });
        return;
    }

    try {
        if (type == 'Indoor') {
            await exerciseData.addIndoors(userId, sport);
        } else if (type == 'Outdoor') {
            await exerciseData.addOutdoors(userId, sport);
        } else {
            await exerciseData.addOthers(userId, sport);
        }
        res.redirect('/exercise')
    } catch (e) {
        res.render('addexercise');
    }
});

module.exports = router;