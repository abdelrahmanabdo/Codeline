const chatService = require('../services/chat.service');
const { validationResult } = require('express-validator');
const socket = require('../../socket').getio();

module.exports = {

  /**
   * Get user chats list
   * 
   */
  getUserChats: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    // Fetch user chats
    await chatService
      .fetchUserChats(req.params.id)
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
   * Get user chats list
   * 
   */
  getChatMessages: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    const {chatId} = req.params;
    // Fetch messages
    await chatService
      .fetchChatMessages(chatId)
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
   * Send new message
   * 
   */
  sendNewMessage: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    let data = {
      ...req.body,
      ...req.params
    };

    socket.emit('new_message', req.body.message);
    await chatService
      .saveNewMessage(data)
      .then((isAdded) => {
        return res.status(200).send({
          success: true,
          message: isAdded 
            ? 'Message added successfully' 
            : 'Wrong Chat Id'
        })
      })
      .catch((error) => {
        return res.status(500).json({
          success: false,
          errors: error
        });
      });
  },

  /**
   * Get user chats members
   * 
   */
  getChatMembers: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    // Fetch chat members
    await chatService
      .fetchChatMembers(req.params.chatId)
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
   * Add user to chat members
   * 
   */
  addChatUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    await chatService
      .saveChatNewMember(req.params.chatId, req.body.user_id)
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: 'Member is added successfully'
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
   * Remove user from chat members
   * 
   */
  removeChatUser: async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({
        success: false,
        errors: errors.array()
      });
    }

    await chatService
      .deleteChatMember(req.params.chatId, req.body.user_id)
      .then((data) => {
        return res.status(200).send({
          success: true,
          message: 'Member is deleted successfully'
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