const storiesService = require('../services/stories.service');
const { validationResult } = require('express-validator');

module.exports = {

  /**
   * Add New Story
   * 
   * @returns {Object}
   * @public
   */
  addNewStory: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }
    await storiesService
      .createNewStory(req.params.id, req.body);

    res.send({
      success: true,
      message: 'Data is added successfully!'
    });
  },

  /**
   * Get User Stories
   * 
   * @returns {Object}
   * @public
   */
  getUserStories: async (req, res) => {
    await storiesService
      .fetchUserStories(req.params.id)
      .then(async (data) => {
        res.send({  
          success: true,
          data
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
   * Get contact Stories
   * 
   * @returns {Object}
   * @public
   */
  getSingleContactStories: async (req, res) => {
    await storiesService
      .fetchContactStories(req.params.id, req.params.contactId)
      .then(async (data) => {
        res.send({
          success: true,
          data
        });
      })
      .catch((err) => {
        return res.send({
          success: false,
          message: err
        });;
      });
  }
}
