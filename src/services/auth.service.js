const db = require('../utils/db');

module.exports = {

  /**
   * Create new user row if phone is not exist.
   * 
   * @returns {Object}
   * @public
   */
  createNewAccount: (body) => {
    return new Promise(async (resolve, reject) => {
      // Check if phone number is registered before or not
      if (await isPhoneAlreadyExist(body.phone)) {
        return reject('Phone number is already exists!')
      }
      // Insert new user record.
      db.query(
          'INSERT INTO users (phone) VALUES (?) ',
          [body.phone],
          (error, results) => {
            if (error) reject(error)
            resolve(results.insertId);
          }
        );
    });
  },

  /**
   * get user data if exists.
   * 
   * @returns {Array}
   * @public
   */
  authUser: (body) => {
    return new Promise((resolve, reject) => {
      const {user_id, pin_code} = body;
      db.query(
        'SELECT * FROM users WHERE id = ? AND pin_code = ?',
        [user_id, pin_code],
        (error, results) => {
          if (error) reject(error)
          resolve(results.length > 0 ? results[0] : null);
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