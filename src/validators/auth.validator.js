const { body } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  createAccountValidator: [
    body('phone')
      .notEmpty()
      .withMessage('Phone is required')
      .isLength({ min: 11 })
      .withMessage('Phone must be at least 11 digits'),
  ],

  /**
   * login validator
   */
  loginValidator: [
    body('user_id')
      .notEmpty()
      .withMessage('user_id is required'),

    body('pin_code')
      .notEmpty()
      .withMessage('pin_code is required')
      .isLength({
        min: 4,
        max: 4
      })
      .withMessage('Pin code must be at least 4 digits'),
  ]
}