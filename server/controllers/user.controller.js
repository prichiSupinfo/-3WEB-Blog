const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const uuidv4 = require('uuid/v4');
const userValidation = require('../utils/userValidation')


module.exports = {
    register: async (request, response, next) => {

        var { username, password, email } = request.body;

        var usernameExist = await User.findOne({ username });
        var emailExist = await User.findOne({ email });
        
        if(usernameExist) {
            return response.status(403).send({ error:'Username already taken' });
        } else if(emailExist) {
            return response.status(403).send({ error:'Email already use' });
        }

        var newUser = new User({ username, password, email });

        newUser.password = await bcrypt.hash(newUser.password, 10);

        newUser.uuid = uuidv4();

        await newUser.save();

        response.status(200).json({ 
            session: newUser.username + "." + newUser.uuid
        });
    },

    login: async (request, response, next) => {
        var { username, password } = request.body;

        var user = await User.findOne({ username });
        
        if(!user) {
            return response.status(403).send({ error:'This username doesn\'t exist' });
        }

        var passwordMatch = await bcrypt.compare(password,user.password);
        if(!passwordMatch){
            return response.status(403).send({ error:'Passwords don\'t match'});
        }

        user.uuid = uuidv4();

        await user.save();

        response.status(200).json({ 
            session: user.username + "." + user.uuid
        });
    },

    logout: async(request, response, next) => {
        
        var user = await userValidation.getUserBySession(request.body);

        if(!user){
            return response.status(403).send({ error:'wrong session token' });
        }

        user.uuid = '';
        await user.save();

        response.status(200).json({ 
            logout: 'sucess',
        });
    },

    secret: async(request, response, next) => {
        var user = await userValidation.getUserBySession(request.body);

        if(!user){
            return response.status(403).send({ error:'wrong session token' });
        }
        
        console.log('User manage to get secret');
        response.status(200).send({ secret: "secret info"});
    }
}