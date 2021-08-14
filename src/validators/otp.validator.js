const { body } = require('express-validator');

module.exports = {
  /**
   * Verify OTP validator
   */
  verifyValidator: [
    // body('user_id')
    //   .notEmpty()
    //   .withMessage('User id is required'),
    body('otp')
      .notEmpty()
      .withMessage('Otp is required')
      .isLength({ min: 6,max: 6})
      .withMessage('Otp Code length must be 6'),
  ],

  /**
   * Resend new user otp validator
   */
  resendValidator: [
    body('user_id')
    .notEmpty()
    .withMessage('User id is required'),
  ],
}