const router = require('express-promise-router')();
const Article = require('../models/article.model'); 

var articleController = require('../controllers/article.controller');

router.route('/create')
    .post(articleController.register);

router.route('/update/:id')
    .post(articleController.login);

router.route('/delete/:id')
    .post(articleController.logout);

router.route('/read/:id')
    .post(articleController.secret);

router.route('/like/:id')
    .post(articleController.validateEmail)

module.exports = router;