const { body } = require('express-validator');

module.exports = {

  /**
   * Verify OTP validator
   */
  verifyValidator: [
    body('user_id')
      .notEmpty()
      .withMessage('user_id is required'),
    body('otp')
      .notEmpty()
      .withMessage('otp is required')
      .isLength({ min: 6,max: 6})
      .withMessage('Pin Code length must be 6 '),
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
}