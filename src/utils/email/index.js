const nodemailer = require("nodemailer");
const { join } = require('path');

module.exports = async (template, data) => {
  const {
    from = 'noreply@codeline.social',
    to = 'noreply@codeline.social',
    subject = `You've got an email!`,
    attachments = []
  } = data;

  // Load template
  const html = await loadTemplate(template, data);

  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  // let testAccount = await nodemailer.createTestAccount();
  try {
    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
      host: "mail.codeline.social",
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: '_mainaccount@codeline.social',
        pass: '29p3x1qUlF',
      },
    });
    
    // send mail with defined transport object
    let email = await transporter.sendMail({
      from,
      to,
      subject,
      html,
      attachments
    });

    console.log("Message sent: %s", email.messageId);
    return email.messageId;
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  } catch (e) {
    console.log('Sending email error', e);
    return e;
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