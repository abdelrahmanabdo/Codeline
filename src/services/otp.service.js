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
  createUserNewOTP: (userId = null, otpCode) => {
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
   * Create new otp code for non-registered user.
   * 
   * @param {String} otpCode
   * @returns {Object}
   * @public
   */
  createNonRegisteredUserOTP: (otpCode) => {
    return new Promise(async (resolve, reject) => {
      db.query(
        'INSERT INTO OTPs (user_id, otp_code) VALUES (null, ?) ',
        [otpCode],
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
  verify: (userId = null, otpCode) => {
    return new Promise(async (resolve, reject) => {
      await db.query(`SELECT * FROM OTPs WHERE otp_code = '${otpCode}'`,
        (error, results) => {
          if (error) return reject(error);
          if (results && results.length > 0) {
            db.query(`UPDATE OTPs SET verified = true WHERE otp_code = '${otpCode}'`,
              (err, data) => {
                if (err) return reject(err);
                resolve(data.affectedRows === 1 ? true : false);
              }
            );
          }
          resolve(false);
        });
    });
  },

}