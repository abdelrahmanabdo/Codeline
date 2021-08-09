const router = require('express').Router();
const {
  getLanguages,
  getCities,
  getOccasions,
  getMaritalStatuses
} = require('../controllers/lookups.controller');

// Get languages list
router.get('/languages', getLanguages);
// Get languages list
router.get('/cities', getCities);
// Get languages list
router.get('/occasions', getOccasions);
// Get languages list
router.get('/marital_statuses', getMaritalStatuses);

module.exports = router;