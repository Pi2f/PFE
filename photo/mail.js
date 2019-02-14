const nodemailer = require('nodemailer');
const config = require('./config.js');

const transporter = nodemailer.createTransport({
    service: config.mailService,
    auth: {
      user: config.sendMail,
      pass: config.pass,
    }
});

module.exports = {
    sendMail: function(mail, file, done){
          const mailOptions = {
            to: mail,
            from: config.sendMail,
            subject: 'Melanome analysis',
            text: 'This is the photo of Melanome',
            attachments:[{
              filename: "melanome.jpg",
              content: new Buffer(file),
              contentType: 'binary'              
             }],
          };
          transporter.sendMail(mailOptions, function (err) {
            done(err);
          });
    },
}