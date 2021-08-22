const db = require('../utils/db');
var bcrypt = require('bcrypt');

module.exports = {

  /**
   * Fetch all users.
   * 
   * @returns {Object}
   * @public
   */
  fetchUsersList: () => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, email, phone, avatar, is_active, is_online, created_at
         FROM users`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch specific user by id
   * 
   * @returns {Object}
   * @public
   */
  fetchUserById: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT id, name, email, phone, avatar, is_active, is_online, created_at
         FROM users
         WHERE id = ?`,
        [id],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Fetch specific user by email.
   * 
   * @returns {Object}
   * @public
   */
  fetchUserByEmail: (email) => {
    return new Promise((resolve, reject) => {
      db.query(
         `SELECT id, name, email, phone, avatar, is_active, is_online, created_at
          FROM users
          WHERE email = ?`,
        [email],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Update user data.
   * Change name, email and avatar columns values only.
   * 
   * @returns {Object}
   * @public
   */
  updateUser: (id, data) => {
    let updateQuery = '';
    // Filter data and allow only 3 updatable columns.
    Object.keys(data)
      .forEach((key, index) => {
        updateQuery += `${key} = '${data[key]}'` +
          ((index + 1 === Object.keys(data).length) ? '' : ', ');
      });

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET ${updateQuery} WHERE id = ${id}`,
        (error, results) => {
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  },



  /**
   * Update user pin_code.
   * Change name, email and avatar columns values only.
   * 
   * @returns {Object}
   * @public
   */
  updateUserPinCode: (id, pin_code) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET pin_code = '${pin_code}' WHERE id = ${id}`,
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Update user password.
   * 
   * @returns {Object}
   * @public
   */
  updateUserPassword: (id, password) => {
    return new Promise((resolve, reject) => {
      cryptPassword(password, (err, hashedPassword) => {
        db.query(
          `UPDATE users SET password = '${hashedPassword}' WHERE id = ${id}`,
          (error, results) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });
    });
  },

  /**
   * Reset user password.
   * 
   * @returns {Object}
   * @public
   */
  resetUserPassword: (email) => {
    return new Promise((resolve, reject) => {
      var randomPassword = Math.random().toString(36).slice(-8);
      cryptPassword(randomPassword, (err, hashedPassword) => {
        db.query(
          `UPDATE users SET password = '${hashedPassword}' WHERE email = '${email}'`,
          (error, results) => {
            if (error) return reject(error);
            resolve({
              success: results.affectedRows > 0 ? true : false,
              newPassword: randomPassword
            });
          }
        );
      });
    });
  },

  /**
   * Get user phone number.
   * 
   * @returns {Array}
   * @public
   */
  getUserPhone: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT phone from users where id = ? limit 1',
        [userId],
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0].phone : null);
        }
      );
    });
  },
}


// Crypt new user password
cryptPassword = async function (password, callback) {
  await bcrypt.genSalt(10, function (err, salt = env.process.PASSWORD_HASH_SALT || 'codeline user password salt') {
    if (err)
      return callback(err);

    bcrypt.hash(password, salt, function (err, hash) {
      return callback(err, hash);
    });
  });
};