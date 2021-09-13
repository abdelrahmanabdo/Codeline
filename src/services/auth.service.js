const db = require('../utils/db');
const bcrypt = require('bcrypt');
const upload = require('../helpers/upload');
const uuid = require('uuid');
const moment = require('moment');

module.exports = {

  /**
   * Create new user row if phone is not exist.
   * 
   * @returns {Object}
   * @public
   */
  createNewAccount: async (body) => {
    return new Promise(async (resolve, reject) => {
      // Check if phone number is registered before or not
      if (await isPhoneAlreadyExist(body.phone)) {
        return reject('Phone number is already exists!')
      }

      // In case user add avatar
      if (body.avatar) {
        const storedAvatar = await upload(
          body.avatar, 
          uuid.v4(), 
          `users`
        );
        body.avatar = storedAvatar || null;
      }

      // Encrypt Password
      cryptPassword(body.password, (err, hashedPassword) => {
        if (hashedPassword) {
          // Insert new user record.
          db.query(
              'INSERT INTO users (phone, name, password, avatar, email) VALUES (?, ?, ?, ?, ?) ',
              [
                body.phone,
                body.name,
                hashedPassword,
                body.avatar,
                body.email,
              ],
              (error, results) => {
                console.log(error)
                if (error) reject(error)
                resolve(results.insertId);
              }
            );
        } else {
          reject(err)
        }
      });
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
      const {phone} = body;
      db.query(
        `SELECT 
          id, 
          phone, 
          name, 
          email, 
          password, 
          avatar, 
          is_online, 
          last_online, 
          is_active,
          is_subscribed,
          created_at
          FROM users 
          WHERE phone LIKE '${phone}'`,
        (error, results) => {
          if (error) return reject(error)
          if (results.length === 0) return reject('No User Found!');

          comparePassword(body.password, results[0].password, (err, isPasswordMatch) => {
            if (isPasswordMatch) {
              delete results[0].password;
              resolve(results[0]);
            }
            else reject('Wrong User Password');
          }); 
        }
      );
    });
  },


  /**
   * Log user out
   * 
   * @returns {Array}
   * @public
   */
  logUserOut: (userId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users
          SET is_online = false,
          last_online = '${moment().format('YYYY-MM-DD hh:mm:ss')}'
         WHERE id = ${userId}`,
        (error, results) => {
          if (error) return reject(error)
          return resolve(results.affectedRows === 0 ? false : true);
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

// Compare login user password and stored data
comparePassword = function (plainPass, hashword, callback) {
  bcrypt.compare(plainPass, hashword, function (err, isPasswordMatch) {
    return err == null ?
      callback(null, isPasswordMatch) :
      callback(err);
  });
};