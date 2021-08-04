const userService = require('../services/user.service');
const { validationResult } = require('express-validator');

module.exports = {
  /**
   * Get all users.
   * 
   * @returns {Object}
   * @public
   */
  getUsers: (req, res) => {
    userService.fetchUsersList()
      .then((result) => {
        res.send({
          success: true,
          data: result
        })
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * Get specific user with id.
   * 
   * @returns {Object}
   * @public
   */
  get: (req, res) => {
    const {id} = req.params;
    if (!id) return res.send({
      success: false,
      message: 'Missing user id'
    });

    userService.fetchSpecificUser(req.params.id)
      .then((result) => {
        res.send({
          success: true,
          data: result
        });
      })
      .catch((err) => {
        throw err;
      });
  },

  /**
   * Post new user data.
   * 
   * @param {Object?} data 
   * @returns {Object}
   * @public
   */
  post: (req, res, next) => {
    console.log('post', req)
  },

  /**
   * Update user data.
   * 
   * @param {Object?} data 
   * @returns {Object}
   * @public
   */
  update: (req, res, next) => {
    const data = JSON.parse(JSON.stringify(req.body));

    // Upload image
    // here 

    // Update data
    userService.updateUser(req.params.id, data)
      .then(() => {
        return res.status(200).send({
          success: true,
          message: 'Data is updated successfully!'
        })
        ;
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: 'Something wrong happened!'
        });
      });
  },

  /**
   * Remove user.
   * 
   * @returns {Object}
   * @public
   */
  remove: (req, res, next) => {

  },


  /**
   * Update user pin code.
   * 
   * @private
   */
  updatePinCode: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    userService.updateUserPinCode(req.params.id, req.body.pin_code)
      .then(() => {
        return res.status(200).send({
          success: true,
          message: 'Pin Code is updated successfully!'
        });
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: 'Something wrong happened!'
        });
      });
  },

  /**
   * Update user's password.
   * 
   * @private
   */
  updatePassword: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    userService.updateUserPassword(req.params.id, req.body.password)
      .then(() => {
        return res.status(200).send({
          success: true,
          message: 'Password is updated successfully!'
        });
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: 'Something wrong happened!'
        });
      });
  },

  /**
   * Reset user's password.
   * 
   * @private
   */
  resetPassword: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    userService.resetUserPassword(req.params.id)
      .then(() => {
        return res.status(200).send({
          success: true,
          message: 'Password is reset successfully!'
        });
      })
      .catch(() => {
        return res.status(500).send({
          success: false,
          message: 'Something wrong happened!'
        });
      });
  }
}