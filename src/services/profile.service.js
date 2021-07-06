const db = require('../utils/db');

module.exports = {

  /**
   * Fetch user's all profile data.
   * 
   * @returns {Object}
   * @public
   */
  fetchUserProfile: (id) => {
    return new Promise((resolve, reject) => {
      const queries = [
        `SELECT * FROM user_profile WHERE user_id = ${id}`,
        `SELECT * FROM user_gallery WHERE user_id = ${id}`,
        `SELECT * FROM user_occasions WHERE user_id = ${id}`,
        `SELECT * FROM user_projects WHERE user_id = ${id}`,
      ];
      db.query(queries.join(';'), (error, results) => {
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
  fetchProfileInformation: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_profile WHERE user_id = ${id} LIMIT 1`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
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
  fetchProfileGallery: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_gallery WHERE user_id = ${id}`,
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
  fetchProfileOccasions: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_occasions WHERE user_id = ${id}`,
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
  fetchProfileProjects: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_projects WHERE user_id = ${id}`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
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
  upsertProfileInformation: (action = 'insert', id, data) => {
    const query = action === 'insert'
      ? `INSERT INTO user_profile ( user_id, ${
         Object.keys(data).reduce((cur, acc, index) => cur + acc + ((index + 1 === Object.keys(data).length) ? '' : ',') , '')}) VALUES (${id},${
         Object.values(data).reduce((cur, acc, index) => `${cur} '${acc}'` + ((index + 1 === Object.values(data).length) ? '' : ',') , '')})`
      : `UPDATE user_profile SET${
         Object.keys(data).reduce((cur, acc, index) => `${cur} ${acc} = '${data[acc]}'` + ((index + 1 === Object.keys(data).length) ? '' : ',') , '')} WHERE user_id = ${id}`
        
    return new Promise((resolve, reject) => {
      db.query(
        query,
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },


  /**
   * Insert new profile gallery row
   * @param {*} user_id 
   * @returns 
   */ 
  insertNewGalleryRow: (userId, data) => {
    return new Promise((resolve, reject) => {
      // Insert new user record.
      db.query(
        `INSERT INTO user_gallery (user_id, title, image) VALUES (${
          userId}, ${data.title ? `'${data.title}'` : null}, '${data.image}')`,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.insertId);
        }
      );
    });
  },

  /**
   * Insert new profile occasion row
   * @param {*} user_id 
   * @returns 
   */
  insertNewOccasionRow: (userId, data) => {
    return new Promise((resolve, reject) => {
      // Insert new user record.
      db.query(
        `INSERT INTO user_occasions (user_id, occasion_id, date) VALUES (${userId}, ${data.occasion_id}, '${data.date}')`,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.insertId);
        }
      );
    });
  },

  /**
   * Insert new profile occasion row
   * @param {*} user_id 
   * @returns 
   */
  insertNewProjectRow: (userId, data) => {
    return new Promise((resolve, reject) => {
      // Insert new user record.
      db.query(
        `INSERT INTO user_projects (user_id, title, description, image) VALUES (${
          userId}, ${data.title ? `'${data.title}'` : null}, ${data.description}, '${data.image}')`,
        (error, results) => {
          if (error) return reject(error)
          resolve(results.insertId);
        }
      );
    });
  },

  /**
   * Delete gallery item
   * @param {*} userId 
   * @param {*} itemId 
   * @returns 
   */
  deleteGallery: (userId, itemId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM user_gallery where id = ${itemId} AND user_id = ${userId}`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results.affectedRows > 0 ? true : false);
        }
      );
    });
  },

  /**
   * Delete Occasion item
   * @param {*} userId 
   * @param {*} itemId 
   * @returns 
   */
  deleteOccasion: (userId, itemId) => {
      return new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM user_occasions where id = ${itemId} AND user_id = ${userId}`,
          (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows > 0 ? true : false);
          }
        );
      });
  },


  /**
   * Check if user phone is exists
   * 
   * @param {String} phone
   * @returns {Boolean}
   */
  checkUserHasProfile: (user_id) => {
    return new Promise((resolve, reject) => {
      db.query(
        'SELECT * FROM user_profile WHERE user_id = ?',
        [user_id],
        (error, results) => {
          if (error) reject(error);
          resolve(results.length > 0 ? true : false);
        }
      );
    });
  }
}
