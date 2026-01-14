// utils/otp.js

import crypto from 'crypto';
import bcrypt from 'bcryptjs';

const generateOTP = () => {
  return crypto.randomInt(100000, 999999).toString();
};

const hashOTP = async (otp) => {
  return await bcrypt.hash(otp, 12);
};

export { generateOTP, hashOTP };