const router = require('express').Router();
const {
  createUserValidator,
  updatePinCodeValidator,
  updatePasswordValidator
} = require('../validators/user.validator');
const {
  post,
  get,
  update,
  remove,
  updatePinCode,
  updatePassword,
  getUsers
} = require('../controllers/user.controller');


router.get('/:id', get); // get specific user id
router.post('', createUserValidator, post); // add new user
router.put('/:id', update); // update user data
router.delete('/:id', remove); // delete user
router.put('/:id/pin_code', updatePinCodeValidator, updatePinCode); // Update user's pin code
router.put('/:id/password', updatePasswordValidator, updatePassword); // Update user's password
router.get('', getUsers); // get users list

module.exports = router;
