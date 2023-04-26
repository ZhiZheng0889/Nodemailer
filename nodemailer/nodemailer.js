require('dotenv').config();
const AWS = require('aws-sdk');
const nodemailer = require('nodemailer');

// Set the AWS region
AWS.config.update({ region: 'your-region' });

// Create an SNS service object
const sns = new AWS.SNS({ apiVersion: '2010-03-31' });

// Set up the message parameters for SNS
const snsParams = {
  Message: 'Hello from Amazon SNS!',
  PhoneNumber: '+1234567890', // Replace with the recipient's phone number in E.164 format
};

// Send the text message
sns.publish(snsParams, (err, data) => {
  if (err) {
    console.error(err, err.stack);
  } else {
    console.log('Text message sent:', data.MessageId);
  }
});

// Create transporter for Nodemailer
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.AWS_ACCESS_KEY_ID,
    pass: process.env.AWS_SECRET_ACCESS_KEY,
  },
  authMethod: 'LOGIN',
});

// Set up email data
const mailOptions = {
  from: process.env.FROM_EMAIL,
  to: process.env.TO_EMAIL,
  subject: 'Test Email',
  text: 'This is a test email sent from Nodemailer using Amazon SES',
};

// Send email
transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});
