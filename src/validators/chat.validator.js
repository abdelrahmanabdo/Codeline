const { body, param } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  getChats: [
    param('id')
    .notEmpty()
    .withMessage('User id is required')
  ],
  /**
   * Search in user's chats
   */
  searchInChatsValidator: [
    body('query')
      .notEmpty()
      .withMessage('Search query is required'),
  ],
  /**
   * Send message validator
   */
  sendMessageValidator: [
    body('message')
    .notEmpty()
    .withMessage('Message is required'),
  ],

  manageChatUsersValidator: [
    body('user_id')
    .notEmpty()
    .withMessage('user id is required'),  
  ]

}