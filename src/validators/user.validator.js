const { body } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  createUserValidator: [
    body('phone')
      .notEmpty()
      .withMessage('Phone is required')
      .isLength({ min: 11 })
      .withMessage('Phone must be at least 11 digits'),
  ],

  /**
   * Update user pin_code validator
   */
  updatePinCodeValidator: [
    body('pin_code')
    .notEmpty()
    .withMessage('Pin code is required')
    .isLength({ min: 4,max: 4})
    .withMessage('Pin Code must be 4 digits'),
  ],

  /**
   * Update user password validator
   */
  updatePasswordValidator: [
    body('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({
      min: 8
    })
    .withMessage('Password must be at least 8 digits'),
  ],
}