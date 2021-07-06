const router = require('express').Router();
const {
  createProfileGalleryValidator, 
  createProfileOccasionValidator,
  createProfileProjectValidator
} = require('../validators/profile.validator');
const {
  getUserProfile,
  getProfileInformation,
  getProfileGallery,
  getProfileOccasions,
  getProfileProjects,
  upsertProfileInformation,
  insertProfileGallery,
  insertProfileOccasion,
  insertProfileProject,
  deleteProfileGallery,
  deleteProfileOccasion
} = require('../controllers/profile.controller');


router.get('/:id', getUserProfile); // get users list
router.get('/:id/information', getProfileInformation); // get user's profile information
router.get('/:id/gallery', getProfileGallery); // get user's profile gallery
router.get('/:id/occasions', getProfileOccasions); // get user's profile occasions
router.get('/:id/projects', getProfileProjects); // get user's profile projects

router.post('/:id/information', upsertProfileInformation); // insert user's profile information
router.post('/:id/gallery', createProfileGalleryValidator, insertProfileGallery); // insert user's profile gallery
router.post('/:id/occasions', createProfileOccasionValidator ,insertProfileOccasion); // insert user's profile occasions
router.post('/:id/projects', createProfileProjectValidator, insertProfileProject); // insert user's profile projects

router.put('/:id/information', upsertProfileInformation); // update user's profile information

router.delete('/:id/gallery/:itemId', deleteProfileGallery); // delete user's profile gallery
router.delete('/:id/occasions/:itemId', deleteProfileOccasion); // delete user's profile occasions
// router.delete('/:id/projects', deleteProfileProjectValidator, deleteProfileProject); // delete user's profile projects

module.exports = router;  