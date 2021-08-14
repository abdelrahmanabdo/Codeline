const otpService = require('../services/otp.service');
const { validationResult } = require('express-validator');
const twilioHandler = require('../utils/twilio');
const userService = require('../services/user.service');

module.exports = {

  /**
   * Create non-registered user OTP code
   * 
   * @param {String} phone
   */
  createNonRegisteredUserOTP: async (phone) => {
    const newOTP = await generateNewOTP(1000);
    return await otpService.createNonRegisteredUserOTP(newOTP)
      .then(async (code) => {
        // Send user sms message
        await twilioHandler(phone, 'Your OTP Code is ' + code);
        return code;
      })
      .catch((err) => {
        return err;
      });
  },

  /**
   * Create new user OTP code
   * 
   * @param {Number} userId
   * @param {String} userPhone
   */
  createUserOTP:  async (userId, userPhone) => {
    const newOTP = await generateNewOTP(userId);
    return await otpService.createUserNewOTP(userId, newOTP)
      .then(async (code) => {
        // Send user sms message
        await twilioHandler(userPhone, 'Your OTP Code is ' + code);
        return code;
      })
      .catch((err) => {
        return err;
      });
  },

  /**
   * Resend new OTP code to user
   * 
   * @returns {Object}
   */
  resendNewOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const {user_id} = req.body;
    // Generate new otp
    const newOTP = await generateNewOTP(user_id);
    // Get user's phone number
    const userPhone = await userService.getUserPhone(user_id);

    await otpService.createUserNewOTP(user_id, newOTP)
      .then(async (code) => {
        // Send user sms message
        await twilioHandler(userPhone, 'Your OTP Code is ' + newOTP);
        return res.status(200).json({
          success: true,
          data: code
        });
      })
      .catch((err) => {
        return err;
      });
  },

  /**
   * Resend new OTP code to user
   * 
   * @param {Number} userId
   * @returns {String} otp_code
   */
  verifyOTP: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const {user_id, otp} = req.body;
    otpService.verify(user_id, otp)
      .then((result) => {
        res.send({
          success: result,
          message: result
            ? 'OTP is valid'
            : 'OTP is not valid',
        });
      })
      .catch((err) => {
        throw err;
      });
  },

}

/**
 * Create new user OTP code
 * 
 * @param {Number} user_id
 * @returns {String} otp_code
 */
generateNewOTP = (user_id) => {
  const otpStructure = `${user_id}0123456789abcdefghijklmnopqrstuvwxyz`
  let OTP = '';
  for (let i = 0; i < 6; i++) {
    OTP += otpStructure[Math.floor(Math.random() * otpStructure.length)];
  }
  return OTP.toUpperCase();
}