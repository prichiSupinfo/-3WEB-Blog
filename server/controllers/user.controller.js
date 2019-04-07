var jwt = require('jsonwebtoken');
var config = require('../config.json')
var User = require('../models/user.model');

function signToken(user){
    return jwt.sign({
        iss: 'SupBlog',
        sub: user._id,
        iat: new Date().getTime(),
        exp: new Date().setDate(new Date().getDate() + 1)
    }, config.secret);
}

module.exports = {
    register: async (request, response) => {

        var { username, password, email } = request.body;
        console.log(username);

        var usernameExist = await User.findOne({ username });
        var emailExist = await User.findOne({ email });
        
        if(usernameExist) {
            return response.status(403).send({ error:'Username already taken' });
        } else if(emailExist) {
            return response.status(403).send({ error:'Email already use' });
        }

        var newUser = new User({ username, password, email });
        //TODO store a hash password
        await newUser.save();
        
        var token = signToken(newUser);

        response.status(200).json({ token });
    },

    login: async (request, response, next) => {
        console.log('reach login');



        response.writeHead(200,{'type':'text/html'});
        response.write("lol");
        response.end();
    }
}