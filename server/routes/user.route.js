const router = require('express-promise-router')();
const User = require('../models/user.model'); 

var userController = require('../controllers/user.controller');

router.route('/register')
    .post(userController.register)
    .get(function(request, response,next) {
        //TODO : send register vue
        response.writeHead(200,{'type':'text/html'});
        response.end();
        next();
    });

router.route('/login')
    .post(userController.login)
    .get(function(request, response,next) {
        //TODO : send login vue
        response.writeHead(200,{'type':'text/html'});
        response.end();
        next();
    });

router.use('/logout', userController.logout);

router.use('/secret', userController.secret)

module.exports = router;