const router = require('express').Router();
const { verifyValidator } = require('../validators/otp.validator');
const { 
  resendNewOTP, 
  verifyOTP,
} = require('../controllers/otp.controller');

router.post('/resend', resendNewOTP);
router.post('/verify', verifyValidator, verifyOTP);

module.exports = router;  