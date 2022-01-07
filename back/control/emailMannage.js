const nodemailer = require('nodemailer');
require('dotenv').config();

function sendMail(addresEmail, userName, token){

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user:  process.env.EMAIL,
      pass: process.env.PASSWORD
    }
  });
  const mailOptions = {
    from: process.env.EMAIL2,
    to: addresEmail,
    subject: `HELLO ${userName}`,
    text: `CODE : ${token}`
  };
  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });
}

module.exports = sendMail