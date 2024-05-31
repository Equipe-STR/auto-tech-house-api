// Importações necessárias
import express from 'express';
import http from 'http';
import 'express-async-errors';
import path from 'path';
import routes from './routes/index';
import { errorInterceptor } from './middlewares/errors/errorInterceptor';
import WebSocket from 'ws';

// Criação da aplicação Express
const app = express();

// Configuração de middlewares e rotas
app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, '..', 'public')));
app.use(errorInterceptor);

// Criação do servidor HTTP
const serverHttp = http.createServer(app);

// Configuração do WebSocket
const wss = new WebSocket.Server({ server: serverHttp });

// Exportação dos objetos do servidor
export { serverHttp, wss };

