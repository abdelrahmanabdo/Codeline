const router = require('express').Router();
const {
  getUsers,
  getUser,
  getSpecificUser,
  insertUser,
  updateUser,
  removeUser,
} = require('../controllers/user.controller');

router.get('', getUsers); // get users list
router.get('/me', getUser); // get single user
router.get('/:id', getSpecificUser); // get specific user id
router.post('', insertUser); // add new user
router.put('/:id', updateUser); // update user data
router.delete('/:id', removeUser); // delete user

module.exports = router;  