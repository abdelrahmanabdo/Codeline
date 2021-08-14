const { body } = require('express-validator');

module.exports = {

  /**
   * Create account validator
   */
  phoneNumberVerification: [
    body('phone')
    .notEmpty()
    .withMessage('Phone is required')
    .isLength({
      min: 11
    })
    .withMessage('Phone must be at least 11 digits')
    .not()
    .custom((val) => /[^0-9|+]/g.test(val))
    .withMessage('Phone format is invalid')
  ],

  /**
   * Create account validator
   */
  createAccountValidator: [
    body('phone')
      .notEmpty()
      .withMessage('Phone is required')
      .isLength({ min: 11 })
      .withMessage('Phone must be at least 11 digits')
      .not()
      .custom((val) => /[^0-9|+]/g.test(val))
      .withMessage('Phone format is invalid'),
    body('password')
      .notEmpty()
      .withMessage('Password is required')
      .isLength({ min: 8 })
      .withMessage('Password must be at least 8 digits'),
    body('name')
      .notEmpty()
      .withMessage('name is required'),
    body('email')
      .isEmail()
      .withMessage('Email format is invalid')
      .notEmpty()
      .withMessage('Email is required'),
  ],

  /**
   * login validator
   */
  loginValidator: [
    body('phone')
      .notEmpty()
      .withMessage('Phone is required')
      .not()
      .custom((val) => /[^0-9|+]/g.test(val))
      .withMessage('Phone format is invalid'),

    body('password')
      .notEmpty()
      .withMessage('password is required')
      .isLength({  min: 8 })
      .withMessage('Password must be at least 8 digits'),
  ]
}