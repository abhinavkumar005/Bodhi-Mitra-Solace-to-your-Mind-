// src/api/chat.js
const API_URL = process.env.REACT_APP_API_URL;

export const sendMessage = (emergencyId, message) =>
  fetch(`${API_URL}/api/v1/chats`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ emergencyId, message })
  }).then(res => res.json());

export const getChatHistory = (emergencyId) =>
  fetch(`${API_URL}/api/v1/chats/${emergencyId}`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json());