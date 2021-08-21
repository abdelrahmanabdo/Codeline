const nodemailer = require("nodemailer");
const { join } = require('path');

module.exports = async (template, data) => {
  const {
    from = 'noreply@bodecanada.com',
    to = 'noreply@bodecanada.com',
    subject = `You've got an email!`,
  } = data;

  // Load template
  const html = await loadTemplate(template, data);

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'app.codeline@gmail.com', // generated ethereal user
        pass: 'Kimo663752', // generated ethereal password
      },
    });
    
    // send mail with defined transport object
    let email = await transporter.sendMail({
      from,
      to,
      subject,
      html,
    });

    console.log("Message sent: %s", email.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (e) {
    console.log('Sending email error', e);
  }
}
/**
 * Load template.
 *
 * @param {String} name 
 * @param {Object} data 
 * @returns {String}
 * @private
 */

function loadTemplate(name, data) {
  const template = require(join(__dirname, `./templates/${name}`));
  console.log(template)
  return template(data);
}