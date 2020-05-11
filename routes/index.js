const userRoutes = require('./users');
const postRoutes = require('./posts');
const signupRoutes = require('./signup');
const healthRoutes = require('./health');

const constructorMethod = (app) => {
    app.use('/', userRoutes);
    app.use('/posts', postRoutes);
    app.use('/signup', signupRoutes);
    app.use('/health', healthRoutes);

    app.use('*', (req, res) => {
        res.sendStatus(404);
    });
}

module.exports = constructorMethod;