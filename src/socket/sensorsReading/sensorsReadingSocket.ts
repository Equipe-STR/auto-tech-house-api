import { io } from '../../app';
import 'express-async-errors';

interface RoomUser {
  socket_id: string;
  username: string;
  room: string;
  timeout: NodeJS.Timeout | null; // Para armazenar a referência ao temporizador
}

interface Message {
  text: string;
  room: string;
  createdAt: Date;
  username: string;
}

const users: RoomUser[] = [];
const messages: Message[] = [];

io.on('connection', socket => {
  
});


