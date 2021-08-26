const router = require('express').Router();
const {
  addUserContactsValidator,
  searchInContactsValidator
} = require('../validators/contacts.validator');
const {
  getUserContacts,
  addUserContacts,
  searchInUserContacts
} = require('../controllers/contacts.controller');

// Get user's contacts list
router.get('/:id', getUserContacts);
// Add user's new contacts
router.post('/:id', addUserContactsValidator, addUserContacts); 
// Search in user's contacts
router.post('/:id/search', searchInContactsValidator, searchInUserContacts);
module.exports = router;