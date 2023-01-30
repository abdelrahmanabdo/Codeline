const {
  json
} = require('body-parser');
const db = require('../utils/db');
const chatService = require('./chat.service');
const userService = require('./user.service');

module.exports = {

  /**
   * Fetch user contacts list
   */
  fetchUserContacts: function async (userId) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          u.id,
          c.contact_name,
          u.email,
          u.phone,
          u.avatar,
          u.qb_id
         FROM contacts c, users u
         WHERE c.contact_id = u.id AND c.user_id = ${userId}`,
        async (error, contacts) => {
          if (error) return reject(error);

          if (contacts.length > 0) {
            const userChats = await chatService.fetchUserChats(userId);

            for (var i = 0; i < contacts.length; i++) {
              const hasChat = userChats.find((chat) => chat.users[0].id == contacts[i].id);
              contacts[i]['chat_id'] = hasChat ? hasChat.id : null;
            }
          }

          return resolve(contacts);
        }
      );
    });
  },

  /**
   * Add new user's contacts
   */
  addNewContacts: function async (userId, contacts) {
    return new Promise(async (resolve, reject) => {
      try {
        const user = await userService.fetchUserById(userId);
        console.log({ user });
        for (var i = 0; i < contacts.length; i++) {
          if (typeof contacts[i] !== 'object') return reject('Wrong contacts format');
          let currentContact = contacts[i];
          // Check if this user has an account in our platform or not.
          const contact = await userService.fetchUserByPhone(currentContact.phone);
          console.log({ contact });
          
          if (contact && (user.phone != contact.phone)) {
            console.log('here');
            // Check if the contact already in the list of this user.
            const isContact = await isAlreadyContact(userId, contact.id);
            // Insert contact record.
            if (!isContact) {
              await addContact(
                userId,
                contact.id,
                currentContact.name || currentContact.phone
              );
              // Update user's qb_id if exists
              if (currentContact.qb_id) {
                await userService.updateUser(contact.id, { qb_id: currentContact.qb_id});
              }
            }
          }
        }
        return resolve(true);
      } catch (e) {
        return reject(e);
      }
    });
  },

  /**
   * Search
   */
  searchInContacts: function async (userId, query) {
    return new Promise(async (resolve, reject) => {
      await db.query(
        `SELECT 
          c.contact_name as name,
          u.avatar,
          u.phone,
          u.email
         FROM contacts c, users u
         WHERE c.contact_id = u.id
         AND c.user_id = ${userId}
         AND c.contact_name LIKE '%${query}%'`,
        async (error, results) => {
          if (error) return reject(error);
          return resolve(results);
        }
      );
    });
  },
}

/**
 * Check if contact already in the list of this user.
 * @param {Number} userId 
 * @param {Number} contactId 
 * @returns {boolean}
 */
const isAlreadyContact = async (userId, contactId) => {
  return new Promise(async (resolve, reject) => {
    await db.query(
      `SELECT * FROM contacts WHERE user_id = ${userId} AND contact_id = ${contactId}`,
      async (error, results) => {
        if (error) return reject(error);
        return resolve(results.length > 0 ? true : false);
      }
    );
  })
}

/**
 * Add users to chat
 * @param {Number} userId 
 * @param {Number} contactId 
 * @param {String} contactName 
 * @returns {boolean}
 */
const addContact = async (userId, contactId, contactName) => {
  return new Promise(async (resolve, reject) => {
    await db.query(
      `INSERT INTO contacts (user_id, contact_id, contact_name)
       VALUES (${userId}, ${contactId}, '${contactName}')`,
      async (error, results) => {
        if (error) return reject(error);
        return resolve(results.affectedRows === 1 ? true : false);
      }
    );
  });
};
