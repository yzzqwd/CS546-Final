const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const postData = data.posts;
const healthData = data.health;
const exerciseData = data.exercise;
const groupData = data.groups;

router.get('/', async (req, res) => {
    let users = [];

    try {
        users = await userData.getAll();
        for (let x of users) {
            for (i = 0; i < x.posts.length; i++) {
                x.posts[i] = await postData.get(x.post[i]);
            }
        }
    } catch (e) {
        console.log(e);
    }

    res.render('admin', {
        users: users
    });
});

router.get('/createGroup', async (req, res) => {
    res.render('newgroup');
})

router.post('/createGroup', async (req, res) => {
    const input = req.body;
    const name = input['name'];
    const ltg = input['ltg'];
    const announcements = input['announcements'];

    if (!name || !ltg || !announcements) {
        res.render('newgroup', {
            miss: true
        });
        return;
    }

    try {
        await groupData.create(name, ltg, announcements);
        res.redirect('/admin');
    } catch (e) {
        res.render('newgroup');
    }
});

router.delete('/user/:id', async (req, res) => {
    try {
        const user = await userData.get(req.params.id);
        await exerciseData.remove(user._id);
        await healthData.remove(user._id);
        const group_id = user.group_id;
        if (group_id != '') {
            await groupData.removeUserFromGroup(group_id, user._id);
        }
        for (let x of user.posts) {
            await postData.removePost(x);
        }
        await userData.remove(req.params.id);
    } catch (e) {
        console.log(e);
    }

    res.redirect('/admin');
});

router.delete('/post/:id', async (req, res) => {
    try {
        await postData.removePost(req.params.id);
    } catch (e) {
        console.log(e);
    }

    res.redirect('/admin');
});

module.exports = router;