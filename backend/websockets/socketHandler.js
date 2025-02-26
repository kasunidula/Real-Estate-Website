import { Server } from 'socket.io';
import logger from '../utils/logger.js';

const socketHandler = (server) => {
    const io = new Server(server, {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        logger.info(`New client connected: ${socket.id}`);

        // Example: Listen for a chat message
        socket.on('sendMessage', (data) => {
            logger.info(`Message received from ${socket.id}: ${data.message}`);
            io.emit('receiveMessage', data); // Broadcast to all clients
        });

        // Example: Handle disconnection
        socket.on('disconnect', () => {
            logger.info(`Client disconnected: ${socket.id}`);
        });
    });

    return io;
};

export default socketHandler;
