const db = require('../utils/db');
const userService = require('./user.service');

module.exports = {

  /**
   * fetch user calls list
   */
  fetchUserCalls: function (userId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.id,
          c.type,
          c.name,
          m.message last_message,
          SUM(CASE WHEN m.seen = 0 THEN 1 ELSE 0 END) not_seen,
          m.created_at,
          c.created_by
         FROM chats c
         JOIN chat_users cu
         ON c.id = cu.chat_id
         LEFT JOIN messages m
         ON m.chat_id = c.id
         WHERE cu.user_id = ${userId}
         AND cu.is_left = false
         GROUP BY cu.chat_id
         ORDER BY m.created_at DESC`,
        async (error, chats) => {
          if (error) return reject(error);
          if (chats.length > 0) {
            for (var i = 0; i < chats.length; i++) {
              const users = await this.fetchChatMembers(chats[i].id);
              chats[i]['users'] = users;
            };
          }
          return resolve(chats);
        }
      );
    });
  },


  /**
   * fetch user calls list
   */
  searchInCalls: function (userId, query) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.id,
          c.type,
          SUM(CASE WHEN m.seen = 0 THEN 1 ELSE 0 END) not_seen,
          m.created_at,
          c.created_by
         FROM calls c
         JOIN chat_users cu
         ON c.id = cu.chat_id
         LEFT JOIN messages m
         ON m.chat_id = c.id
         WHERE cu.user_id = ${userId}
         AND c.name LIKE '%${query}%'
         GROUP BY cu.chat_id
         ORDER BY m.created_at DESC
         `,
        async (error, chats) => {
          if (error) return reject(error);
          if (chats.length > 0) {
            for (var i = 0; i < chats.length; i++) {
              const users = await this.fetchChatMembers(chats[i].id);
              chats[i]['users'] = users;
            };
          }
          return resolve(chats);
        }
      );
    });
  },
}