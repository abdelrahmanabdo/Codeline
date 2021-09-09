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
      .fetchContactStories(req.params.contactId)
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
   * Deleted message from user's chat
   * 
   */
  deleteUserStory: async (req, res) => {
    const {
      id,
      storyId
    } = req.params;

    await storiesService
      .deleteStory(id, storyId)
      .then((isDelete) => {
        return res.status(200).send({
          success: isDelete ? true: false,
          message: isDelete
            ? 'Data is deleted successfully'
            : 'Please check IDs'
        });
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error
        });
      });
  },
}
