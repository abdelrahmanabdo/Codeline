const { body } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  addNewStoryValidator: [
    body('type')
    .notEmpty()
    .withMessage('Type is required'),
    body('content')
    .notEmpty()
    .withMessage('content is required')
  ],
}