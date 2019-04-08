const User = require('../models/user.model');

module.exports = {
    getUserBySession: async ({session}) => {
        if(!session){
            return false;
        }
        username = session.split('.')[0];
        uuid = session.split('.')[1];

        var user = await User.findOne({ username});

        if (!user || user.uuid !== uuid || user.uuid === ""){
            return false;
        }
        return user;
    }
}