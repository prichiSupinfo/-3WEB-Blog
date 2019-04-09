const router = require('express-promise-router')();

const userController = require('../controllers/user.controller');

router.route('/register')
    .post(userController.register)

router.route('/login')
    .post(userController.login)

router.route('/logout')
    .post(userController.logout);

router.route('/secret')
    .post(userController.secret);

router.route('/emailValidation')
    .post(userController.validateEmail)

module.exports = router;