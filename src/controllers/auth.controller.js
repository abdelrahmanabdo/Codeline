const authService = require('../services/auth.service');
const userService = require('../services/user.service');
const otpController = require('./otp.controller');
const { createUserOTP } = require('../controllers/otp.controller');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const config = require('../config/constants');

module.exports = {

  /**
   * Create new account
   * 
   * @returns {Object}
   * @public
   */
  verifyPhoneNumber: async(req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const otp = await otpController
      .createNonRegisteredUserOTP(req.body.phone);

    res.send({
      success: true,
      otp
    });
  },

  /**
   * Create new account
   * 
   * @returns {Object}
   * @public
   */
  createAccount: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        success: false,
        errors: errors.array() 
      }); 
    }

    authService
      .createNewAccount(req.body)
      .then(async (userId) => {
        // create user token
        var token = createUserToken(userId);
        // Create new otp and send sms message to user
        await createUserOTP(userId, req.body.phone);
        // Get user data
        const user = await userService.fetchUserById(userId);

        res.send({
          success: true,
          token,
          user: {
            id: user.id,
            phone: user.phone,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            is_active: true,
            is_online: true,
            created_at: user.created_at
          }
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  },

  /**
   * Login user
   * 
   * @returns {Object}
   * @public
   */
  login: (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    authService.authUser(req.body)
      .then((user) => {
        if (!user) return res.status(404).send({
          success: false,
          message: 'No USER FOUND'
        });

        // create user token
        var token = createUserToken(user.id);

        res.send({
          success: true,
          user: {
            ...user,
            is_active: true,
            is_online: true,
          },
          token
        })
      })
      .catch((err) => {
        return res.status(404).json({
          success: false,
          message: err
        });
      });
  },

}


/**
 * Create new user token
 * 
 * @returns {String}
 * @private
 */
createUserToken = (userId) => {
  return jwt.sign(
            { id: userId },
            config.jwtSecret,
            { expiresIn: 86400922 }
         );
}