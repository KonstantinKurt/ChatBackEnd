const nodemailer = require('nodemailer');
const config = require('../config.js');
const letter = require('./letter.js');

let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: '',
        pass: '',
    }
});
let getMailoptions = function(sender,name) {
    return {
        from: config.email, 
        to: sender, 
        subject: 'Greeting from Chat', 
        html: letter(name),
    }
};

module.exports = {
   transporter: transporter,
   getMailoptions: getMailoptions,
};