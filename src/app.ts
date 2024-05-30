import express from 'express';
import http from 'http';
import 'express-async-errors';
import path from 'path'
import routes from './routes/index';
const PORT = process.env.PORT || 3333;
import { Server } from "socket.io";
import { errorInterceptor } from './middlewares/errors/errorInterceptor';

const app = express();

app.use(express.json());
app.use(routes);
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(errorInterceptor);

const severHttp = http.createServer(app);

const io = new Server(severHttp);

export {severHttp, io}

