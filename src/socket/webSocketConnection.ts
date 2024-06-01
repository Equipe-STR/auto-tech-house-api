import { wss } from '../app';
import 'express-async-errors';
import WebSocket, { WebSocketServer, WebSocket as wsType } from 'ws';

wss.on('connection', (ws: wsType) => {
  console.log('Cliente conectado via WebSocket');

  ws.on('message', (message: string) => {
      console.log(message.toString());
      wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
              client.send(message.toString());
          }
      });
  });

  ws.on('close', () => {
      console.log('Cliente desconectado');
  });
});
