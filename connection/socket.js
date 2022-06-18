import { Server } from 'socket.io';
import jwt from 'jsonwebtoken';
import { config } from '../config.js';

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*'
      },
    });

    this.io.use((socket, next) => {
      // Socket을 사용할 때는 보안문제로 꼭! auth안 있는 token을 사용해야 한다. 
      const token = socket.handshake.auth.token;
      if(!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decoded) => {
        if(error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });

    this.io.on('connection', (socket) => {
      console.log('Socket Client Connected');
    });
  }
}

let socket;
export function initSocket(server) {
  if(!socket) {
    socket = new Socket(server);
  }
}

export function getSocketIO(){
  if(!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
}

