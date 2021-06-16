const router = require('express').Router();
const {
  createAccountValidator,
  loginValidator
} = require('../validators/auth.validator');
const {
  createAccount,
  login
} = require('../controllers/auth.controller');

// Create new account
router.post('/create_account', createAccountValidator, createAccount); 
// login user
router.post('/login', loginValidator, login);

module.exports = router;