import { Router, Request, Response } from 'express';
import usersRouter from '../http/users/routes/users.routes';
const routes = Router();

routes.use('/users', usersRouter);


export default routes;