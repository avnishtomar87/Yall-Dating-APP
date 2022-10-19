const nodemailer = require('nodemailer');
const {EMAIL_PORT,EMAIL_HOST,EMAIL_USERNAME,EMAIL_PASSWORD,EMAIL_FROM} = require("../helpers/constant")

const sendEmail = async options => {
  // 1) Create a transporter
  const transporter = nodemailer.createTransport({
    host: EMAIL_HOST,
    port: EMAIL_PORT,
    auth: {
      user: EMAIL_USERNAME,
      pass: EMAIL_PASSWORD
    }
  });

  // 2) Define the email options
  const mailOptions = {
    from:EMAIL_FROM,
    to: options.email,
    subject: options.subject,
    text: options.message
  };

  // 3) Actually send the email
  await transporter.sendMail(mailOptions, function (error, response) {
		if (error) {
			return error;
		}
		transporter.close(); // shut down the connection pool, no more messages
		return response;
	});
};

module.exports = sendEmail;
