'use strict';
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var cors = require('cors');


var config = require('./config.json');
var port = config.port;

mongoose.connect(config.dbURL, { useNewUrlParser: true })

var app = express();

app.use(express.static('../client/public'));


//Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

//Routes
app.use('/auth', require('./routes/user.route'));
app.use('/article', require('./routes/article.route'));

app.get(['/', '/index'], function (request, response, next) {
    response.sendFile(path.resolve('../client/public/index.html'));
})



//Start
var server = app.listen(port);
console.log("server ready on port " + port);

var io = require('socket.io').listen(server);


const Article = require('./models/article.model');
const User = require('./models/user.model');
const userValidation = require('./utils/userValidation');

// IO Starts here
io.of('/comments').on('connection', (socket) => {
    socket.on("joinRoom", (room) => {
        socket.join(room);
        socket.on('comment', (request)=> {
            // Adding comment to
            //console.log(request)
            comment(room, request);

            socket.in(room).emit('newComment', request.comment)
        })
        
    });
});

async function comment (id, request) {
    console.log(request.session);
    var user = await userValidation.getUserBySession(request.session);
    if (!user){
        return ;
    } 
    
    var comment = request.comment;
    var article = await Article.findById(id);
    article.comments.push(comment);
    await alertWriter(article);
    await article.save(); 
    console.log(comment);
    
    
}

async function alertWriter(article){

}