var router = require('express-promise-router')();

var userController = require('../controllers/user.controller');

router.route('/register')
    .post(userController.register)
    .get(function(request, response,next) {
        response.writeHead(200,{'type':'text/html'});
        response.write("<form method=\"POST\"> </form>");
        response.end();
        next();
    });

router.route('/login')
    .post(userController.login)
    .get(function(request, response,next) {
        response.writeHead(200,{'type':'text/html'});
        response.write("<form method=\"POST\"> </form>");
        response.end();
        next();
    });

module.exports = router;