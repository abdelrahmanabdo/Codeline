const { body, param } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  addCall: [
   body('type')
     .notEmpty()
     .withMessage('type is required'),
   body('status')
     .notEmpty()
     .withMessage('status is required'),
   body('created_at')
     .notEmpty()
     .withMessage('created_at is required'),
   body('ended_at')
     .notEmpty()
     .withMessage('ended_at is required'),

  ],

  /**
   * Create account validator
   */
  getCalls: [
    param('id')
    .notEmpty()
    .withMessage('User id is required')
  ],

  /**
   * Search in user's chats
   */
  searchInCallsValidator: [
    body('query')
      .notEmpty()
      .withMessage('Search query is required'),
  ],

}