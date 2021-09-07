const router = require('express').Router();
const {
  addNewStoryValidator,
} = require('../validators/stories.validator');
const {
  addNewStory,
  getUserStories,
  getSingleContactStories,
  deleteUserStory
} = require('../controllers/stories.controller');

// Add new story
router.post('/:id', addNewStoryValidator, addNewStory);
// Get users stories
router.get('/:id', getUserStories); 
// Get single user stories
router.get('/:id/contact/:contactId', getSingleContactStories);
// Delete story
router.delete('/:id/delete/:storyId', deleteUserStory);

module.exports = router;