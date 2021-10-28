const router = require('express').Router();
const {
  saveNewCall,
  getUserCalls,
  getCallParticipants,
  searchInUserCalls,
  deleteCall
} = require('../controllers/calls.controller');
const { 
  addCall,
  getCalls,
  searchInCallsValidator
} = require('../validators/calls.validator');

router.post('/:id', addCall, saveNewCall);
router.get('/:id', getCalls, getUserCalls);
router.get('/:id/participants/:callId', getCalls, getCallParticipants);
router.post('/:id/search', searchInCallsValidator, searchInUserCalls);
router.delete('/:id/remove/:callId', deleteCall);

module.exports = router;  