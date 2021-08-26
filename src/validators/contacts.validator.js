const { body } = require('express-validator');

module.exports = {
  /**
   * Add user's contacts list validator
   */
  addUserContactsValidator: [
    body('contacts')
      .notEmpty()
      .withMessage('Contacts list is required')
  ],
  searchInContactsValidator: [
    body('query')
      .notEmpty()
      .withMessage('Search query is required')
  ]
}