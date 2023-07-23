import { Server, Socket } from 'socket.io';

function onConnection(io: Server, socket: Socket) {
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
}

export default onConnection;
