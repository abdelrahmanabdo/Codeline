const router = require('express').Router();
const {
  createAccountValidator,
  loginValidator,
  phoneNumberVerification
} = require('../validators/auth.validator');
const {
  createAccount,
  login,
  verifyPhoneNumber
} = require('../controllers/auth.controller');

// Create new account
router.post('/verify', phoneNumberVerification, verifyPhoneNumber);
// Create new account
router.post('/create_account', createAccountValidator, createAccount); 
// log user in
router.post('/login', loginValidator, login);

module.exports = router;