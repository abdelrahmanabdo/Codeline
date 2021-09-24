const router = require('express').Router();
const {
  getUserCalls,
  searchInUserCalls,
} = require('../controllers/calls.controller');
const { 
  getCalls, 
  searchInCallsValidator
} = require('../validators/calls.validator');

router.get('/:id', getCalls, getUserCalls);
router.post('/:id/search', searchInCallsValidator, searchInUserCalls);

module.exports = router;  