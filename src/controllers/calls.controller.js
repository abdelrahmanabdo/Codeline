const callsService = require('../services/calls.service');
const { validationResult } = require('express-validator');
const socket = require('../../socket').getio();

module.exports = {

  saveNewCall: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    // Fetch user chats
    await callsService
      .createNewCall(req.params.id, req.body)
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: 'Added successfully'
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
   * Get call Participants
   * 
   */
  getCallParticipants: async (req, res) => {
    const {
      callId,
      id
    } = req.params;
    
    await callsService
      .fetchCallParticipants(callId)
      .then((data) => {
        return res.status(200).send({
          success: true,
          data
        });
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

  /**
   *  Delete chat from user chats list
   * 
   */
  deleteCall: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    await callsService
      .deleteCall(req.params.callId)
      .then((isDeleted) => {
        return res.status(200).send({
          success: isDeleted,
          message: isDeleted ?
            'Call is deleted successfully' : 'User has already deleted this call'
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