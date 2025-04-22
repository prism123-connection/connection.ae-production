import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export function createSocket(token: string) {
  if (!token) throw new Error('No token provided for socket');

  if (!socket || !socket.connected) {
    socket = io('https://f0c8-40-172-141-164.ngrok-free.app', {
      // socket = io('http://localhost:3001', {
      // socket = io('http://40.172.141.164:3001', {
      transports: ['websocket'],
      auth: { token }, // or whatever you're passing
    });
  }
  
  return socket;
}
