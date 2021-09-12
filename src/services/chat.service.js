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
          m.created_at,
          c.created_by
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
  fetchChatMessages: async (chatId, userId) => {
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
          m.reply_to as reply_to_id,
          r.message as reply_to_message,
          m.seen,
          CASE true
          WHEN m.deleted_from LIKE '%"${userId}"%' THEN true
          ELSE false
          END as is_deleted,
          m.created_at
         FROM messages m
         JOIN users u
         ON u.id = m.user_id
         LEFT JOIN messages r 
         ON m.reply_to = r.id
         WHERE m.chat_id = ${chatId}
         ORDER BY created_at`,
        async (error, results) => {
          if (error) return reject(error);
          // If there are messages in this chat
          // Mark chat messages as seen
          if (results && results.length > 0) await markMessagesSeen(chatId, userId);
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
        message_type,
        reply_to
      } = data;

      if (
        message_type 
        && (
          message_type === 'Audio'
          || message_type === 'File'
          || message_type === 'Image' 
          || message_type === 'Video'
        )
      ) {
        const storedImage = await upload(
          message, 
          uuid.v4(), 
          `chats/${id}`,
          message_type.toLowerCase()
        );
        message = storedImage || null;
      }

      // If there is a chat already
      if (chat_id) {
        await db.query(
          `INSERT INTO messages (chat_id, user_id, message, reply_to, type)
           VALUES (${chat_id}, ${id}, '${message}', ${reply_to || null}, '${message_type || 'Text'}')`,
          async (error, results) => {
            if (error) return reject(error);
            resolve({
              ...data,
              isAdded: results.affectedRows == 1 
                ? true : false
            });
          }
        );
      } else {
        // Add current user id to list of chat users
        to.push(id);
        // Create chat name
        const chatName = chat_name || await createChatName(to);
        // Create new chat 
        const newChatId = await createNewChat(
          to.length > 2 ? 'Group' : 'Single', 
          chatName,
          id
        );
        // Add chat's users
        await addChatUsers(newChatId, to);
        // Insert the new message
        await db.query(
          `INSERT INTO messages (chat_id, user_id, message, reply_to, type)
           VALUES (${newChatId}, ${id}, '${message}', ${reply_to || null}, '${message_type || 'Text'}')`,
          async (error, results) => {
            if (error) return reject(error);
            resolve({
              ...data,
              chat_id: newChatId,
              isAdded: results.affectedRows == 1 
                ? true : false
            });
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
  deleteChatMember: async (userId, chatId) => {
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
   * Delete chat message
   */
  deleteMessage: async (userId, chatId, messageId) => {
    return new Promise(async (resolve, reject) => {
      let message = await fetchChatMessage(chatId, messageId);
      if (message) {
        let { deleted_from } = message;
        let deletedFromIds = deleted_from ? JSON.parse(deleted_from) : [];
        if (deletedFromIds.includes(userId))
          return resolve({
            status: false, 
            message: 'User already deleted this message'
          });
        else
          deletedFromIds.push(userId);

        // Update DB
        db.query(
          `UPDATE messages SET
            deleted_from = '${JSON.stringify(deletedFromIds)}'
            WHERE id = ${messageId}`,
          async (error, results) => {
            if (error) return reject(error);
            return resolve({
              status: results.affectedRows == 1 ? true : false, 
              message: 'Message is deleted for this user successfully'
            });
          }
        );
      } else {
        return reject('Wrong IDs');
      }
    });
  },

  /**
   * When user delete chat or user left group chat
   */
  leftChat: async (userId, chatId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE chat_users SET is_left = true 
         WHERE chat_id = ${chatId} AND user_id = ${userId}`,
        async (error, results) => {
          if (error) return reject(error);
          resolve(results.changedRows == 1 ? true : false);
        }
      );
    });
  },
}

// Fetch chat message.
const fetchChatMessage = async (chatId, messageId) => {
  return new Promise(async (resolve, reject) => {
     await db.query(
      `SELECT * FROM messages
       WHERE id = ${messageId} AND chat_id = ${chatId}`,
      async (error, results) => {
        if (error) return reject(error);
        return resolve(results[0]);
      }
    );
  });
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
const createNewChat = async (type, chatName, adminId) => {
  return new Promise(async (resolve, reject) => {
    await db.query(
      `INSERT INTO chats (type, name, created_by)
        VALUES ('${type}', '${chatName}', ${adminId})`,
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
const markMessagesSeen = async (chatId, userId) => {
  return await db.query(
    `UPDATE messages SET seen = 1
     WHERE chat_id = ${chatId}
     AND user_id <> ${userId}`,
    async (error, results) => {
      if (error) return error;
      return results.affectedRows > 0 ? true : false;
    }
  );
}