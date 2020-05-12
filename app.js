const express = require('express');
const app = express();
const session = require('express-session');
const configRoutes = require('./routes');
const exphbs = require('express-handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');
 
const static = express.static(__dirname + '/public');
app.use('/public', static);

app.use(
    session({
        name: 'Group3Cookie',
        secret: 'Some secrets that you dont know!',
        resave: false,
        saveUninitialized: true
    })
);

app.use('/posts', async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});

app.use('/health', async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});

app.use('/exercise', async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});

app.use('/groups', async (req, res, next) => {
    if (!req.session.user) {
        return res.redirect('/');
    } else {
        next();
    }
});

configRoutes(app);
app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});