const userService = require('../services/user.service');

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
   * Get single user.
   * 
   * @returns {Object}
   * @public
   */
  getUser: (req, res) => {
    userService.fetchCurrentUser()
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
  getSpecificUser: (req, res) => {
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
        })
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
  insertUser: (req, res, next) => {
    console.log('post', req)
  },

  /**
   * Update user data.
   * 
   * @param {Object?} data 
   * @returns {Object}
   * @public
   */
  updateUser: (req, res, next) => {

  },

  /**
   * Remove user.
   * 
   * @returns {Object}
   * @public
   */
  removeUser: (req, res, next) => {

  },
}