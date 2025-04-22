import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function createSocket(token: string) {
  if (!token) throw new Error('No token provided for socket');

  if (!socket || !socket.connected) {
    socket = io('http://40.172.141.164:3001', {
      auth: { token }, // or whatever you're passing
    });
  }

  return socket;
}