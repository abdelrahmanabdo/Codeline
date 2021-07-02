const router = require('express').Router();
const {
  verifyValidator,
  resendValidator
} = require('../validators/otp.validator');
const { 
  resendNewOTP, 
  verifyOTP,
} = require('../controllers/otp.controller');

router.post('/resend', resendValidator, resendNewOTP);
router.post('/verify', verifyValidator, verifyOTP);

module.exports = router;  