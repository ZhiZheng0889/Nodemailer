require('dotenv').config();
const nodemailer = require('nodemailer');

// create transporter
const transporter = nodemailer.createTransport({
    host: 'email-smtp.us-east-1.amazonaws.com',
    port: 587,
    secure: false,
    auth: {
      user: process.env.AWS_ACCESS_KEY_ID,
      pass: process.env.AWS_SECRET_ACCESS_KEY
    },
    authMethod: 'LOGIN'
  });
  

// setup email data
const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: 'Test Email',
  text: 'This is a test email sent from Nodemailer using Amazon SES'
};

// send email
transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
