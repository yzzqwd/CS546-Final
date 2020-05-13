const userRoutes = require('./users');
const postRoutes = require('./posts');
const signupRoutes = require('./signup');
const healthRoutes = require('./health');
const exerciseRoutes = require('./exercise');
const groupRoutes = require('./groups');
const adminRoutes = require('./admin');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/signup', signupRoutes);
    app.use('/health', healthRoutes);
    app.use('/exercise', exerciseRoutes);
    app.use('/group', groupRoutes);
    app.use('/admin', adminRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
}

module.exports = constructorMethod;