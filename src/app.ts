import express from 'express';
import http from 'http';

import path from 'path'
import routes from './routes/index';
import 'express-async-errors';

import { Server } from "socket.io";
import errorInterceptor from './middlewares/errors/errorInterceptor';

const app = express();

app.use(routes);
app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use(errorInterceptor);

const severHttp = http.createServer(app);

const io = new Server(severHttp);

export {severHttp, io}

