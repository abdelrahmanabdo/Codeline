const db = require('../utils/db');

module.exports = {

  /**
   * Create new otp code for new registered user.
   * 
   * @param {Number} user_id
   * @param {String} otpCode
   * @returns {Object}
   * @public
   */
  createUserNewOTP: (userId, otpCode) => {
    return new Promise(async (resolve, reject) => {
      db.query(
        'INSERT INTO OTPs (user_id, otp_code) VALUES (?, ?) ',
        [userId, otpCode],
        (error, results) => {
          if (error) reject(error)
          resolve(otpCode);
        }
      );
    });
  },

  /**
   * verify otp.
   * 
   * @public
   */
  verify: (userId, otpCode) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM OTPs WHERE user_id = ${userId} AND otp_code = '${otpCode}'`,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.length > 0 ? true : false);
        }
      );
    });
  },

}