// routes/authRoutes.js

import express from 'express';
import {
  registerStudent,
  requestOTP,
  verifyOTP,
  login
} from '../controllers/authController.js';

const router = express.Router();

router.route('/register-student').post(registerStudent);
router.route('/request-otp').post(requestOTP);
router.route('/verify-otp').post(verifyOTP);
router.route('/login').post(login);

export default router;