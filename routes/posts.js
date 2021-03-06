const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const postData = data.posts;
const xss = require('xss');

router.get('/', async (req, res) => {
    let posts = [];
        
    try {
        posts = await postData.getAll();
        for (let x of posts) {
            const user = await userData.get(x.userId);
            const username = user.username;
            x.username = username;
        }
    } catch (e) {
        console.log(e);
    }
        
    res.render('posts', {
        posts: posts
    });
});


router.get('/add', async (req, res) => {
    res.render('newpost');
});

router.post('/add', async (req, res) => {
    const caption = xss(req.body['caption']);
    const img = xss(req.body['img']);
    const time = new Date();
    const userId = req.session.user.userId;

    if (!caption || !img) {
        res.render('newpost', {
            miss: true
        });
        return;
    }

    try {
        await postData.create(userId, img, caption, time);
        res.redirect('/posts');
    } catch (e) {
        res.render('newpost');
    }
});

router.delete('/:id', async (req, res) => {
    try {
        await postData.removePost(req.params.id);
    } catch (e) {
        console.log(e);
    }

    res.redirect('/posts');
})

module.exports = router; 