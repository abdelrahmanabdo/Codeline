const { body, param } = require('express-validator');

module.exports = {

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