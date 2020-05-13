const express = require('express');
const router = express.Router();
const data = require('../data');
const userData = data.users;
const adminData = data.admin;
const bcrypt = require('bcryptjs');
const xss = require('xss');

router.get('/', async (req, res) => {
    if (req.session.user) {
        res.redirect('/posts');
    } else {
        res.render('login');
    }
});

router.get('/adminlogin', async (req, res) => {
    if (req.session.admin) {
        res.redirect('/admin');
    } else {
        res.render('adminlogin');
    }
});

router.get('/logout', async (req, res) => {
    req.session.destroy();
    res.render('logout');
});

router.post('/login', async (req, res) => {
    const username = xss(req.body['un ']);
    const password = xss(req.body['pass']);
    let result = false;
    let user = {};
    
    try {
        user = await userData.getByUsername(username);
        result = await bcrypt.compare(password, user.hashedPassword);
    } catch (e) {
        console.log(e);
    }

    if (result) {
        req.session.user = {userId: user._id};
        res.redirect('/posts');
    } else {
        res.render('login', {
            error: true
        });
    }
});

router.post('/adminlogin', async (req, res) => {
    const adminname = xss(req.body['adminname']);
    const password = xss(req.body['password']);
    let result = false;
    let admin = {};

    try {
        admin = await adminData.getByUserName(adminname);
        result = await bcrypt.compare(password, admin.hashedPassword);
    } catch (e) {
        console.log(e);
    }

    if (result) {
        req.session.admin = {adminId: admin._id};
        res.redirect('/admin');
    } else {
        res.render('adminlogin', {
            error: true
        });
    }
});

module.exports = router;