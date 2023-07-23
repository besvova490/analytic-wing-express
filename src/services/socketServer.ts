/* eslint-disable import/no-import-module-exports */
import { Server } from 'socket.io';
import http from 'http';

function socketServer(server: http.Server) {
  return new Server(server, {
    cors: {
      origin: '*',
    },
  });
}

export default socketServer;
