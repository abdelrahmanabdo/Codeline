const callsService = require('../services/calls.service');
const { validationResult } = require('express-validator');
const socket = require('../../socket').getio();

module.exports = {

  /**
   * Get user calls list
   * 
   */
  getUserCalls: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }
    return res.status(200).send({
      success: true,
      data: []
    });

    // Fetch user chats
    await callsService
      .fetchUserCalls(req.params.id)
      .then((data) => {
        return res.status(200).send({
          success: true,
          data
        })
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error
        });
      });
  },


  /**
   * Search in user's calls list
   * 
   */
  searchInUserCalls: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    return res.status(200).send({
      success: true,
      data: []
    });

    // Fetch user chats
    await callsService
      .searchInCalls(req.params.id, req.body.query)
      .then((data) => {
        return res.status(200).send({
          success: true,
          data
        })
      })
      .catch((error) => {
        return res.status(500).send({
          success: false,
          message: error
        });
      });
  },

}