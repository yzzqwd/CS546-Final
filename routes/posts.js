const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const postData = data.posts;

router.get('/', async (req, res) => {
    const userId = req.session.user.userId;
    let user = {};
        
    try {
        /*user = await userData.get(userId);
        for (i = 0; i < user.posts.length; i++) {
            user.posts[i] = await postData.get(user.post[i]);
        }*/
        posts = await postData.getAll()
        //console.log(posts)
    } catch (e) {
        console.log(e);
    }
        
    res.render('posts', {
       // posts: user.posts
        posts: posts

    });
});


router.get('/add', async (req, res) => {
    res.render('newpost');
});

router.post('/add', async (req, res) => {
    const input = req.body;
    const caption = input['caption'];
    const img = input['img'];
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