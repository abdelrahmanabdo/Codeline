const router = require('express').Router();
const {
  createProfileGalleryValidator, 
  createProfileOccasionValidator,
  createProfileProjectValidator
} = require('../validators/profile.validator');
const {
  getUserProfile,
  getProfileInformation,
  getProfileGalleries,
  getProfileOccasions,
  getProfileProjects,
  getSingleGallery,
  getSingleOccasion,
  getSingleProject,
  upsertProfileInformation,
  updateOccasion,
  updateProject,
  insertProfileGallery,
  insertProfileOccasion,
  insertProfileProject,
  deleteProfileGallery,
  deleteProfileOccasion,
  deleteProfileProject
} = require('../controllers/profile.controller');


router.get('/:id', getUserProfile); // get users list
router.get('/:id/information', getProfileInformation); // get user's profile information
router.get('/:id/gallery', getProfileGalleries); // get user's profile gallery
router.get('/:id/occasions', getProfileOccasions); // get user's profile occasions
router.get('/:id/projects', getProfileProjects); // get user's profile projects

router.get('/:id/gallery/:galleryId', getSingleGallery); // get user's profile gallery
router.get('/:id/occasions/:occasionId', getSingleOccasion); // get user's profile occasion
router.get('/:id/projects/:projectId', getSingleProject); // get user's profile project


router.post('/:id/information', upsertProfileInformation); // insert user's profile information
router.post('/:id/gallery', createProfileGalleryValidator, insertProfileGallery); // insert user's profile gallery
router.post('/:id/occasions', createProfileOccasionValidator ,insertProfileOccasion); // insert user's profile occasions
router.post('/:id/projects', createProfileProjectValidator, insertProfileProject); // insert user's profile projects

router.put('/:id/information', upsertProfileInformation); // update user's profile information
router.put('/:id/occasions/:occasionId', updateOccasion); // update user's profile occasion
router.put('/:id/projects/:projectId', updateProject); // update user's profile project

router.delete('/:id/gallery/:galleryId', deleteProfileGallery); // delete user's profile gallery
router.delete('/:id/occasions/:occasionId', deleteProfileOccasion); // delete user's profile occasions
router.delete('/:id/projects/:projectId', deleteProfileProject); // delete user's profile projects

module.exports = router;  