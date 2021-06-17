const { body } = require('express-validator');

module.exports = {
  /**
   * Create profile gallery validator
   */
  createProfileGalleryValidator: [
    body('image')
      .notEmpty()
      .withMessage('Image is required'),
  ],

  /**
   * Create profile occasion validator
   */
  createProfileOccasionValidator: [
    body('occasion_id')
      .notEmpty()
      .withMessage('Occasion id is required'),
  ],

  /**
   * Create profile project validator
   */
  createProfileProjectValidator: [
    body('description')
      .notEmpty()
      .withMessage('Description is required'),
    body('image')
      .notEmpty()
      .withMessage('Image is required'),
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