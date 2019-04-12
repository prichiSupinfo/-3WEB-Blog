const Article = require('../models/article.model');
const User = require('../models/user.model');
const userValidation = require('../utils/userValidation');
const emailSender = require("../utils/email");

async function comment (id, request) {

    var user = await userValidation.getUserBySession(request);
    if(!user){
        return false;
    }

    var comment = request.comment;
    var article = await Article.findById(id);
    article.comments.unshift(comment);
    await article.save(); 
    await emailSender.sendAlertCommentEmail(await User.findById(article.writer),article);

    return true;
}

async function createSocket(io){

    io.of('/comments').on('connection', (socket) => {
        socket.on("joinRoom", (room) => {
            socket.join(room);
            socket.on('comment', (request)=> {
                // Adding comment to
                //console.log(request)
                
                if (comment(room, request)){
                    socket.to(room).emit('newComment', request.comment);
                    socket.emit('newComment', request.comment);
                }
                
            })
            
        });
    });
}
module.exports.createSocket = createSocket;