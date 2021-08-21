/**
 * Reset Password email.
 *
 * @param {Object} data
 * @returns {String}
 * @private
 */

module.exports = (data) => {
  const {
    userName,
    newPassword
  } = data;

  return `
    <p><b>Hello</b> <span>${userName},</p>
    <br>
    <p>
      You have reset your password and this is you new password <b>${newPassword}</b> you can login with it then update your password.
    </p>
    <br></br>
    <span>Thanks</span><br>
    <span>Best Regards</span>
  `;

}