const db = require('../utils/db');
const userService = require('../services/user.service');
const upload = require('../helpers/upload');
const uuid = require('uuid');

module.exports = {

  /**
   * fetch user chats list
   */
  fetchUserChats: function (userId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.id,
          c.type,
          c.name,
          m.message last_message,
          SUM(CASE WHEN m.seen = 0 THEN 1 ELSE 0 END) not_seen,
          m.created_at
         FROM chats c
         JOIN chat_users cu
         ON c.id = cu.chat_id
         LEFT JOIN messages m
         ON m.chat_id = c.id
         WHERE cu.user_id = ${userId}
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


  /**
   * fetch user chats list
   */
  searchInChats: function (userId, query) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.id,
          c.type,
          c.name,
          m.message last_message,
          SUM(CASE WHEN m.seen = 0 THEN 1 ELSE 0 END) not_seen,
          m.created_at
         FROM chats c
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

  /**
   * fetch user chat messages
   */
  fetchChatMessages: async (chatId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT 
          m.id,
          m.chat_id,
          m.user_id user_id,
          u.name user_name,
          u.avatar user_avatar,
          m.type,
          m.message,
          m.seen,
          m.created_at
         FROM messages m
         JOIN users u
         ON u.id = m.user_id
         WHERE m.chat_id = ${chatId}`,
        async (error, results) => {
          if (error) return reject(error);
          // If there are messages in this chat
          // Mark chat messages as seen
          if (results && results.length > 0) await markMessagesSeen(chatId);
          return resolve(results);
        }
      );
    });
  },

  /**
   * Save new message to DB
   */
  saveNewMessage: async (data) => {
    return new Promise(async (resolve, reject) => {
      let {
        chat_id,
        chat_name,
        id,
        to,
        message,
        message_type
      } = data;

      if (message_type === 'File' || message_type === 'Image') {
        const storedAvatar = await upload(
          message, 
          uuid.v4(), 
          `chats/${id}`
        );
        message = storedAvatar || null;
      }

      // If there is a chat already
      if (chat_id) {
        await db.query(
          `INSERT INTO messages (chat_id, user_id, message, type)
           VALUES (${chat_id}, ${id}, '${message}', '${message_type || 'Text'}')`,
          async (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows == 1 ? true : false);
          }
        );
      } else {
        // Add current user id to list of chat users
        to.push(id);
        // Create chat name
        const chatName = chat_name || await createChatName(to);
        // Create new chat 
        const newChatId = await createNewChat(to.length > 2 ? 'Group' : 'Single', chatName);
        // Add chat's users
        await addChatUsers(newChatId, to);
        // Insert the new message
        await db.query(
          `INSERT INTO messages (chat_id, user_id, message, type)
           VALUES (${newChatId}, ${id}, '${message}', '${message_type || 'Text'}')`,
          async (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows == 1 ? true : false);
          }
        );
      }
    });
  },

  /**
   * fetch chat members
   */
  fetchChatMembers: (chatId) => {
    return new Promise((resolve, reject) => {
       db.query(
        `SELECT u.id, u.name, u.phone, u.avatar
         FROM users u
         JOIN chat_users cu
         ON u.id = cu.user_id
         WHERE cu.chat_id = ${chatId}`,
         (error, results) => resolve(results));
    });
  },

    /**
     * Save chat new member
     */
    saveChatNewMember: async (chatId, userId) => {
      return new Promise((resolve, reject) => {
        db.query(
          `INSERT INTO chat_users 
         (chat_id, user_id)
         VALUES (${chatId}, ${userId})`,
          async (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows == 1 ? true : false);
          }
        );
      });
    },

    /**
     * Remove chat member
     */
    deleteChatMember: async (chatId, userId) => {
      return new Promise((resolve, reject) => {
        db.query(
          `DELETE FROM chat_users WHERE
           chat_id = ${chatId} AND user_id = ${userId}`,
          async (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows == 1 ? true : false);
          }
        );
      });
    },


    /**
     * When user delete chat or user left group chat
     */
    leftChat: async (chatId, userId) => {
      return new Promise((resolve, reject) => {
        db.query(
          `UPDATE chat_users SET left = 1 
           WHERE  chat_id = ${chatId} AND user_id = ${userId}`,
          async (error, results) => {
            if (error) return reject(error);
            resolve(results.affectedRows == 1 ? true : false);
          }
        );
      });
    },
}

// Create chat name.
const createChatName = async (users) => {
  let name = '';
  for (var i = 0; i < users.length; i++) {
    const user = await userService.fetchUserById(users[i]);
    name += user.name || user.phone;
    if (i !== users.length - 1) name += ', ';
  };
  return name;
}

// Create new chat.
const createNewChat = async (type, chatName) => {
  return new Promise(async (resolve, reject) => {
    await db.query(
      `INSERT INTO chats (type, name)
        VALUES ('${type}', '${chatName}')`,
      async (error, results) => {
        if (error) reject(error);
        resolve(results.insertId);
      }
    );
  });
}

// Add users to chat
const addChatUsers = async (chatId, users = []) => {
  let values = ''
  await users.forEach((user, index) => {
    values += `(${chatId}, ${user})`;
    if (index !== users.length - 1 ) values += ', ';
  });
  return await db.query(
    `INSERT INTO chat_users (chat_id, user_id)
     VALUES ${values}`,
    async (error, results) => {
      if (error) return error;
      return results.affectedRows > 0 ? true : false;
    }
  );
}

// Mark all chat messages as seen
const markMessagesSeen = async (chatId) => {
  return await db.query(
    `UPDATE messages SET seen = 1
     WHERE chat_id = ${chatId}`,
    async (error, results) => {
      if (error) return error;
      return results.affectedRows > 0 ? true : false;
    }
  );
}