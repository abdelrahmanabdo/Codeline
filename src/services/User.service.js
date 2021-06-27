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
        'select * from users',
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch current user.
   * 
   * @returns {Array}
   * @public
   */
  fetchCurrentUser: () => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from users limit 1',
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Fetch specific user.
   * 
   * @returns {Object}
   * @public
   */
  fetchSpecificUser: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'select * from users where id = ?',
        [id],
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
    const updatableCols = ['name', 'email', 'avatar'];
    // Filter data and allow only 3 updatable columns.
    Object.keys(data)
      .forEach((key, index) => {
        updateQuery += `${key} = '${data[key]}'` +
          ((index + 1 === Object.keys(data).length) ? '' : ', ');
      });

    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users set ${updateQuery} where id = ${id}`,
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
        `UPDATE users set pin_code = '${pin_code}' where id = ${id}`,
        (error, results) => {
          if (error) reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Update user password.
   * Change name, email and avatar columns values only.
   * 
   * @returns {Object}
   * @public
   */
  updateUserPassword: (id, password) => {
    return new Promise((resolve, reject) => {
      cryptPassword(password, (err, hashedPassword) => {
        db.query(
          `UPDATE users set password = '${hashedPassword}' where id = ${id}`,
          (error, results) => {
            if (error) reject(error);
            resolve(results);
          }
        );
      });
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