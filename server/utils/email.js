const nodemailer = require('nodemailer');
const config = require('../config.json');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'mail4supproject@gmail.com',
        pass: 'Supinf0isexpensive!',
    }
})

module.exports = {
    sendConfirmationMail: async (user) => {

        const mailOptions = {
            from: 'mail4supproject@gmail.com',
            to: user.email,
            subject: 'Account confirmation for the best blog in the world',
            html:   `
                    <h1>Time to join our community</h1>
                    <form action="http://localhost:${config.port}/auth/emailValidation" method="post">
                    <input type="hidden" name="username" value="${user.username}"/>
                    <input type="hidden" name="uuid" value="${user.uuid}"/>
                    <input type="submit" value="Validate my brand new account :D"/>
                    </form>
                    `
        }

        transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                console.log(error);
            }
        });
    }
}