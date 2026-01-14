// src/api/socket.js
import io from 'socket.io-client';

const SOCKET_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

export const initSocket = (user) => {
  const socket = io(SOCKET_URL, {
    transports: ['websocket'],
    query: { userId: user.id }
  });

  socket.on('connect', () => {
    socket.emit('join-user-room', { id: user.id, role: user.role });
  });

  return socket;
};