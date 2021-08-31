const router = require('express').Router();
const {
  getUserChats,
  deleteChat,
  getChatMessages,
  sendNewMessage,
  getChatMembers,
  addChatUser,
  removeChatUser,
  searchInUserChats,
  deleteChatMessage
} = require('../controllers/chat.controller');
const { 
  getChats, 
  sendMessageValidator,
  manageChatUsersValidator,
  searchInChatsValidator
} = require('../validators/chat.validator');

router.get('/:id', getChats, getUserChats);
router.post('/:id/search', searchInChatsValidator, searchInUserChats);
router.get('/:id/messages/:chatId', getChatMessages);
router.delete('/:id/delete/:chatId', deleteChat);
router.post('/:id/messages/send', sendMessageValidator, sendNewMessage);
router.delete('/:id/remove/:chatId', deleteChat);
router.delete('/:id/messages/:chatId/remove/:messageId', deleteChatMessage);

router.get('/:chatId/members', getChatMembers);
router.post('/:chatId/members/add', manageChatUsersValidator, addChatUser);
router.delete('/:chatId/members/remove', manageChatUsersValidator, removeChatUser);

module.exports = router;  