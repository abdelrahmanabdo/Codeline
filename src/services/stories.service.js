const db = require('../utils/db');
const upload = require('../helpers/upload');
const uuid = require('uuid');

module.exports = {

  /**
   * Fetch user stories list
   */
  fetchUserStories: function async (userId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          u.id,
          c.contact_name as name,
          u.avatar,
          count(u.id) as stories_num
         FROM 
          stories s JOIN contacts c
          ON s.user_id = c.contact_id 
          JOIN users u 
          ON u.id = c.contact_id
         WHERE
          c.user_id = ${userId}
          AND s.created_at > now() - interval 1 day
         GROUP BY u.id
         ORDER BY s.created_at`,
        async (error, stories) => {
          if (error) return reject(error);
          if (stories.length > 0) {
            await db.query(`
            SELECT 
              u.id,
              u.avatar,
              count(u.id) as stories_num
            FROM 
              stories s JOIN users u 
              ON u.id = s.user_id
            WHERE
              s.user_id = ${userId}
              AND s.created_at > now() - interval 1 day
            ORDER BY s.created_at`, (err, res) => {
              if (res.length > 0) stories = [res[0], ...stories];
              return resolve(stories)
            });
          } else {
            return resolve(stories)
          }
        }
      );
    });
  },

  /**
   * Fetch contact stories list
   */
  fetchContactStories: function async (userId, contactId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT
          s.id,
          s.story,
          s.caption,
          s.created_at
         FROM stories s, contacts c
         WHERE s.user_id = c.contact_id
         AND c.user_id = ${userId}
         AND s.user_id = ${contactId}
         ORDER BY created_at`,
        async (error, stories) => {
          if (error) return reject(error);
          return resolve(stories);
        }
      );
    });
  },

  /**
   * creat new user story
   * 
   * @returns {Array}
   * @public
   */
  createNewStory: (userId, data) => {
    let {
      type = 'Image',
      content,
      caption = null
    } = data;
    return new Promise(async (resolve, reject) => {

    // In case uploaded story is image
    if (type === 'Image') {
      const storedImage = await upload(
          content,
          uuid.v4(), 
          `stories/${userId}`
        );
      story = storedImage || null;
    } else {
      story = ''
    }

    await db.query(
        `INSERT INTO stories (user_id, type, story, caption)
        VALUES (${userId}, '${type}', '${story}', ${caption ? "'" + caption + "'" : null})`,
        async (error, results) => {
          if (error) return reject(error);
          return resolve(results.affectedRows === 1 ? true : false);
        }
      );
    });
  },

  /**
   * Delete user story
   * 
   * @returns {Array}
   * @public
   */
  deleteStory: (userId, storyId) => {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `DELETE FROM stories WHERE user_id = ${userId} AND id = ${storyId}`,
        async (error, results) => {
          if (error) return reject(error);
          return resolve(results.affectedRows === 1 ? true : false);
        }
      );
    });
  },
}
