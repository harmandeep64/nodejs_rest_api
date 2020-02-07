const nodemailer    = require('nodemailer');
const app           = require("../config/app");

let send = function(to,subject,message) {
    var transporter = nodemailer.createTransport({
        service: app.EMAIL.SERVICE,
        auth: {
            user: app.EMAIL.USER,
            pass: app.EMAIL.PASS,
        }
    });

    var mailOptions = {
        from:       app.EMAIL.FROM,
        to:         to,
        subject:    subject,
        html:       message,
    };
        
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

module.exports = send;