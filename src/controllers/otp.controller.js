const otpService = require('../services/otp.service');
const { validationResult } = require('express-validator');

module.exports = {

  /**
   * Create new user OTP code
   * 
   * @param {Number} user_id
   * @returns {String} otp_code
   */
  createUserOTP:  async (user_id) => {
    const newOTP = await generateNewOTP(user_id);
    otpService.createUserNewOTP(user_id, newOTP)
      .then((res) => {
        // Send user sms message
        // here
        
        return newOTP;
      })
      .catch((err) => {
        return err;
      });
  },

  /**
   * Resend new OTP code to user
   * 
   * @param {Number} user_id
   * @returns {String} otp_code
   */
  resendNewOTP: async (user_id) => {
    const newOTP = await generateNewOTP(user_id)
    // Send user sms message
    // here

    return newOTP;
  },

  /**
   * Resend new OTP code to user
   * 
   * @param {Number} user_id
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
          message: result ? 'OTP is valid' : 'OTP is not valid',
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
   return OTP;
}