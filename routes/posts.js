const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;

router.get('/:id', async (req,res) => {

});

router.get('/', async (req, res) => {
    let user = {};
    
    try {
        user = await userData.getByUsername(req.session.user.username);
    } catch (e) {
        console.log(e);
    }
    
    res.render('posts', {
        user: user
    });
});

module.exports = router; 