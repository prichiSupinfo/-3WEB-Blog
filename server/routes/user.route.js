var router = require('express-promise-router')();

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

module.exports = router;