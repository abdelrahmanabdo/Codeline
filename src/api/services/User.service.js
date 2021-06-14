const db = require('../utils/db');

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
          if (error) reject(error)
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
          if (error) reject(error)
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
          if (error) reject(error)
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

}