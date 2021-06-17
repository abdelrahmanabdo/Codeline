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
  createUserNewOTP: (user_id, otp_code) => {
    return new Promise(async (resolve, reject) => {
      db.query(
        'INSERT INTO OTPs (user_id, otp_code) VALUES (?, ?) ',
        [user_id, otp_code],
        (error, results) => {
          if (error) reject(error)
          resolve(results);
        }
      );
    });
  },

  /**
   * Recreate new otp for a user.
   * 
   * @returns {Array}
   * @public
   */
  recreateNewOTP: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from users limit 1',
        (error, results) => {
          if (error) reject(error)
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * verify otp.
   * 
   * @public
   */
  verify: (user_id, otp_code) => {
    return new Promise((resolve, reject) => {
      db.query(
        `select * from OTPs where user_id = ${user_id} AND otp_code = '${otp_code}'`,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.length > 0 ? true : false);
        }
      );
    });
  },

}


/**
 * Check if user phone is exists
 * 
 * @param {String} phone
 * @returns {Boolean}
 */
isPhoneAlreadyExist = (phone) => {
  return new Promise((resolve, reject) => {
    db.query(
        'SELECT * FROM users WHERE phone = ?',
        [phone],
        (error, results) => {
          if (error) reject(error);
          resolve(results.length > 0 ? true : false);
        }
    );
  });
}