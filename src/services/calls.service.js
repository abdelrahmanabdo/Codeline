const db = require('../utils/db');
const userService = require('./user.service');

module.exports = {

  /**
   * Create new call
   * @param {*} userId 
   * @returns 
   */
  createNewCall: function (userId, call) {
    const {
      type,
      status,
      created_at,
      ended_at,
      duration,
      userIds
    } = call;

    return new Promise(async (resolve, reject) => {
      await db.query(
        `INSERT INTO calls (type, status, created_at, ended_at, duration)
        VALUES ('${type}', '${status}', '${created_at}', '${ended_at}', ${duration || null})`,
        async (error, results) => {
          if (error) return reject(error);
          // Add chat's users
          await addCallUsers(results.insertId, userIds || []);
          return resolve(results.affectedRows === 1 ? true : false);
        }
      );
    });
  },

  /**
   * fetch user calls list
   */
  fetchUserCalls: function (userId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.id,
          c.type,
          c.status,
          c.duration,
          c.ended_at,
          c.created_at
         FROM calls c
         JOIN call_users cu
         ON c.id = cu.call_id
         WHERE cu.user_id = ${userId}
         GROUP BY cu.call_id
         ORDER BY c.created_at DESC`,
        async (error, calls) => {
          if (error) return reject(error);
          if (calls.length > 0) {
            for (var i = 0; i < calls.length; i++) {
              const users = await this.fetchCallParticipants(calls[i].id);
              calls[i]['users'] = users;
            };
          }
          return resolve(calls);
        }
      );
    });
  },

  /**
   * fetch call Participants
   */
  fetchCallParticipants: function (callId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT u.id, u.name, u.phone, u.avatar, u.is_online, u.last_online
         FROM users u
         JOIN call_users cu
         ON u.id = cu.user_id
         WHERE cu.call_id = ${callId}`,
        async (error, users) => {
          if (error) return reject(error);
          return resolve(users);
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
          c.status,
          c.duration,
          c.ended_at,
          c.created_at
         FROM calls c
         JOIN call_users cu
         ON c.id = cu.call_id
         LEFT JOIN users u
         ON m.call_id = c.id
         WHERE cu.user_id = ${userId}
         AND u.name LIKE '%${query}%'
         GROUP BY cu.call_id
         ORDER BY m.created_at DESC
         `,
        async (error, calls) => {
          if (error) return reject(error);
          if (calls.length > 0) {
            for (var i = 0; i < calls.length; i++) {
              const users = await this.fetchChatMembers(calls[i].id);
              calls[i]['users'] = users;
            };
          }
          return resolve(calls);
        }
      );
    });
  },

  /**
   * When user delete call or user left group call
   */
  deleteCall: async (callId) => {
    return new Promise((resolve, reject) => {
      db.query(
        `DELETE from calls WHERE id = ${callId}`,
        async (error, results) => {
          if (error) return reject(error);
          resolve(results.affectedRows == 1 ? true : false);
        }
      );
    });
  },
}

// Add users to chat
const addCallUsers = async (callId, users = []) => {
  let values = ''
  await users.forEach((user, index) => {
    values += `(${callId}, ${user})`;
    if (index !== users.length - 1) values += ', ';
  });
  return await db.query(
    `INSERT INTO call_users (call_id, user_id)
     VALUES ${values}`,
    async (error, results) => {
      if (error) return error;
      return results.affectedRows > 0 ? true : false;
    }
  );
}