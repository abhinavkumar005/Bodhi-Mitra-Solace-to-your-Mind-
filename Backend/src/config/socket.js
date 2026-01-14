// config/socket.js

let ioInstance = null;

const initializeSocket = (server) => {
  const io = import('socket.io').then(({ Server }) => {
    return new Server(server, {
      cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"]
      }
    });
  });

  io.then(io => {
    io.on('connection', (socket) => {
      socket.on('join-user-room', (userData) => {
        const room = `${userData.role}_${userData.id}`;
        socket.join(room);
        console.log(`User ${userData.id} joined room ${room}`);
      });

      socket.on('disconnect', () => {
        console.log('User disconnected');
      });
    });

    ioInstance = io;
  });
};

const getIO = () => {
  if (!ioInstance) {
    throw new Error('Socket.io not initialized!');
  }
  return ioInstance;
};

export { initializeSocket, getIO };