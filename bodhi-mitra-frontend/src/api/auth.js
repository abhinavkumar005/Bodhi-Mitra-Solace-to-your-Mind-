// src/api/auth.js
const API_URL = process.env.REACT_APP_API_URL;

export const registerStudent = (userData) =>
  fetch(`${API_URL}/api/v1/auth/register-student`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData)
  }).then(res => res.json());

export const verifyOTP = (email, otp) =>
  fetch(`${API_URL}/api/v1/auth/verify-otp`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, otp })
  }).then(res => res.json());

export const login = (email, password) =>
  fetch(`${API_URL}/api/v1/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());