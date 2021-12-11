const db = require('../utils/db');
const upload = require('../helpers/upload');
const uuid = require('uuid');

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
        `SELECT 
          id, 
          phone,
          name, 
          email, 
          avatar, 
          is_online,
          is_subscribed
        FROM users
        WHERE id = ${id}`,
        `SELECT
          p.id,
          p.user_id,
          p.nickname,
          p.birth_date,
          p.marital_status_id,
          m.name_ar as marital_status,
          p.location_id,
          l.name_ar as location,
          p.CV,
          p.bio,
          p.created_at
          FROM user_profile p, marital_statuses m, cities l
          WHERE m.id = p.marital_status_id
          AND l.id = p.location_id
          AND p.user_id = ${id}`,
        `SELECT * FROM user_gallery WHERE user_id = ${id}`,
        `SELECT 
          o.id,
          o.user_id,
          o.occasion_id,
          os.name_ar,
          os.name_en,
          o.date,
          o.created_at
          FROM user_occasions o, occasions os
          WHERE o.user_id = ${id}
          AND os.id = o.occasion_id`,
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
   * Fetch user profile.
   * 
   * @returns {Array}
   * @public
   */
  fetchProfileInformation: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          p.id,
          p.user_id,
          u.avatar,
          u.name,
          u.email,
          p.nickname,
          p.birth_date,
          p.marital_status_id,
          m.name_ar as marital_status,
          p.location_id,
          l.name_ar as location,
          p.CV,
          p.bio,
          p.created_at
          FROM user_profile p, marital_statuses m, cities l, users u
          WHERE m.id = p.marital_status_id
          AND l.id = p.location_id
          AND u.id = p.user_id
          AND p.user_id = ${id}
          LIMIT 1`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Fetch profile galleries.
   * 
   * @returns {Array}
   * @public
   */
  fetchProfileGalleries: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_gallery WHERE user_id = ${id} ORDER BY created_at DESC`,
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
        `SELECT 
          o.id,
          o.user_id,
          o.occasion_id,
          os.name_ar,
          os.name_en,
          o.date,
          o.created_at
        FROM user_occasions o, occasions os
        WHERE o.user_id = ${id}
        AND os.id = o.occasion_id
        ORDER BY created_at DESC`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch profile projects.
   * 
   * @returns {Array}
   * @public
   */
  fetchProfileProjects: (id) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_projects WHERE user_id = ${id} ORDER BY created_at DESC`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results);
        }
      );
    });
  },

  /**
   * Fetch single gallery.
   * 
   * @returns {Array}
   * @public
   */
  fetchSingleGallery: (user_id, galleryId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_gallery WHERE user_id = ${user_id} and id = ${galleryId}`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Fetch single occasion.
   * 
   * @returns {Array}
   * @public
   */
  fetchSingleOccasion: (userId, occasionId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          o.id,
          o.user_id,
          o.occasion_id,
          os.name_ar,
          os.name_en,
          o.date,
          o.created_at
        FROM user_occasions o, occasions os
        WHERE o.user_id = ${userId}
        AND o.id = ${occasionId}
        AND os.id = o.occasion_id`,
        (error, results) => {
          if (error) return reject(error);
          resolve(results.length > 0 ? results[0] : null);
        }
      );
    });
  },

  /**
   * Fetch single project.
   * 
   * @returns {Array}
   * @public
   */
  fetchSingleProject: (user_id, projectId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM user_projects WHERE user_id = ${user_id} and id = ${projectId}`,
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
  upsertProfileInformation: async (action = 'insert', id, data) => {
    // In case user add CV
    if (data.CV) {
      data.CV = await upload(
        data.CV,
        uuid.v4(),
        `profile/${id}`,
        'file'
      );
    }
    
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
    * update exists profile gallery row
    * @param {*} user_id 
    * @returns 
    */
   updateProject: async (projectId, data) => {
     // In case user add image
     if (data.image) {
       const storedImage = await upload(
         data.image,
         uuid.v4(),
         `galleries/${projectId}`
       );
       data.image = storedImage;
     }
     const fields = Object.keys(data).reduce((cur, acc, index) => `${cur} ${acc} = '${data[acc]}'` + ((index + 1 === Object.keys(data).length) ? '' : ','), '');
     return new Promise((resolve, reject) => {
       db.query(
         `UPDATE user_projects SET ${fields} WHERE id = ${projectId}`,
         (error, results) => {
           if (error) return reject(error)
           resolve(results.affectedRows);
         }
       );
     });
   },


   /**
    * update exists profile occasion row
    * @param {*} user_id 
    * @returns 
    */
   updateOccasion: async (occasionId, data) => {
     return new Promise((resolve, reject) => {
       const fields = Object.keys(data).reduce((cur, acc, index) => `${cur} ${acc} = '${data[acc]}'` + ((index + 1 === Object.keys(data).length) ? '' : ','), '');
       db.query(
         `UPDATE user_occasions SET${fields} WHERE id = ${occasionId}`,
         (error, results) => {
           if (error) return reject(error)
           resolve(results.affectedRows);
         }
       );
     });
   },
 

  /**
   * Insert new profile gallery row
   * @param {*} user_id 
   * @returns 
   */ 
  insertNewGalleryRow: async (userId, data) => {
    // In case user add image
    if (data.image) {
      const storedImage = await upload(
          data.image,
          uuid.v4(),
          `galleries/${userId}`
        );
      data.image = storedImage;
    }

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
  insertNewProjectRow: async (userId, data) => {
    // In case user add image
    if (data.image) {
      const storedImage = await upload(
        data.image, 
        uuid.v4(),
        `projects/${userId}`
      );
      data.image = storedImage;
    }

    return new Promise((resolve, reject) => {
      // Insert new user record.
      db.query(
        `INSERT INTO user_projects (user_id, title, description, image, email, phone) VALUES (${
          userId}, '${data.title}', '${data.description}', '${data.image}', ${data.email ? `'${data.email}'` : null}, ${data.phone ? `'${data.phone}'` : null})`,
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
   * Delete project item
   * @param {*} userId 
   * @param {*} itemId 
   * @returns 
   */
  deleteProject: (userId, itemId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE FROM user_projects where id = ${itemId} AND user_id = ${userId}`,
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
