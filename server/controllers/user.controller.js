const bcrypt = require('bcryptjs');
const User = require('../models/user.model');
const uuidv4 = require('uuid/v4');
const userValidation = require('../utils/userValidation');
const emailValidation = require('../utils/email');

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
        newUser.validEmail = false;
        newUser.isAdmin = false;
        newUser.uuid = uuidv4();

        await newUser.save();

        //Send email with link to email validation
        emailValidation.sendConfirmationMail(newUser);

        response.status(200).json({ 
            success: "true",
            info: "Email sent",
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

        if(!user.validEmail){
            return response.status(403).send({ error:'Please first confirm your email'});
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

    validateEmail: async(request, response, next) =>{
        var { username, uuid } = request.body;
        
        var user = await User.findOne({ username });
        
        if (!user){
            return response.status(403).send({error : "Oups something went wrong please try again", "details" : "user doesn't exist"});
        }
        if (user.validEmail){
            return response.status(403).send({error : "Email already confirm"});
        }
        if (user.uuid !== uuid || user.uuid === ""){
            return response.status(403).send({error : "Oups something went wrong please try again", "details" : "uuid doesn't match"});
        }

        user.validEmail = true;
        user.uuid = '';

        await user.save();

        response.status(301).send({ "Location": 'http://localhost:8080/login' });
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