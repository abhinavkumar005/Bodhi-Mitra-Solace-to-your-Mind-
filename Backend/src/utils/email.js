// utils/email.js

import nodemailer from 'nodemailer';
import sgTransport from 'nodemailer-sendgrid';

const sendOTPEmail = async (email, otp) => {
  // Always use SendGrid
  const transporter = nodemailer.createTransport(
    sgTransport({ apiKey: process.env.SENDGRID_API_KEY })
  );

  const message = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'OTP from Bodhi-Mitra (Solace to your Mind)',
    text: `Your OTP is: ${otp}. Valid for 5 minutes.`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 20px auto;">
        <h2>Bodhi-Mitra (Solace to your Mind) 'GAUTAM BUDDHA UNIVERSITY'</h2>
        <p>Your one-time password (OTP) for your Mental Wellbeing is:</p>
        <h1 style="background: #f0f8ff; padding: 15px; border-radius: 8px; letter-spacing: 5px;">
          ${otp}
        </h1>
        <p>This code expires in <strong>5 minutes</strong>.</p>
        <p>If you didn’t request this, please ignore this email.</p>
      </div>
    `,
  };

  await transporter.sendMail(message);
};

export { sendOTPEmail };