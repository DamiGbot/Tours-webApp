"use strict";

var nodemailer = require('nodemailer');

var sendMail = function sendMail(options) {
  var transporter, mailOptions;
  return regeneratorRuntime.async(function sendMail$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            auth: {
              user: process.env.EMAIL_USER,
              pass: process.env.EMAIL_PASSWORD
            }
          });
          mailOptions = {
            from: 'Oluwadamilola Gbotolorun <damigbot@gmail.com>',
            to: options.email,
            subject: options.subject,
            text: options.message
          };
          _context.next = 4;
          return regeneratorRuntime.awrap(transporter.sendMail(mailOptions));

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
};

module.exports = sendMail;