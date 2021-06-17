const router = require('express').Router();
const {
  createUserValidator,
  updatePinCodeValidator
} = require('../validators/user.validator');
const {
  post,
  get,
  update,
  remove,
  updatePinCode,
  getUsers,
  getUser
} = require('../controllers/user.controller');

router.post('', createUserValidator, post); // add new user
router.get('/:id', get); // get specific user id
router.put('/:id', update); // update user data
router.delete('/:id', remove); // delete user
router.put('/:id/pin_code', updatePinCodeValidator, updatePinCode); // delete user
router.get('', getUsers); // get users list
router.get('/me', getUser); // get single user

module.exports = router;
