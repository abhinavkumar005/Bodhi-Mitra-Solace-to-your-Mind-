// src/api/emergencies.js
const API_URL = process.env.REACT_APP_API_URL;

export const createEmergency = () =>
  fetch(`${API_URL}/api/v1/emergencies`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`,
      'Content-Type': 'application/json'
    }
  }).then(res => res.json());

export const acceptEmergency = (id) =>
  fetch(`${API_URL}/api/v1/emergencies/${id}/accept`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => res.json());

export const closeEmergency = (id) =>
  fetch(`${API_URL}/api/v1/emergencies/${id}/close`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    }
  }).then(res => res.json());

export const getMyEmergencies = () =>
  fetch(`${API_URL}/api/v1/emergencies/me`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json());

export const getAssignedEmergencies = () =>
  fetch(`${API_URL}/api/v1/emergencies/assigned`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json());

// For admin to get all emergencies
export const getAllEmergencies = () =>
  fetch(`${API_URL}/api/v1/emergencies`, {
    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
  }).then(res => res.json());