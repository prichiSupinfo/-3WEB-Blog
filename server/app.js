'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var port = process.env.PORT || 1337;

var app = express();
app.use(express.static('../client/public'));

//Middlewares
app.unsubscribe(bodyParser.json());


//Routes
app.use('/auth',require('./routes/user.route'))

app.get(['/', '/index'], function (request, response, next) {
    response.sendFile(path.resolve('../client/public/index.html'));
})

//Start
app.listen(port);
console.log("server ready on port " + port);