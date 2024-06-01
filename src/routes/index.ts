import { Router, Request, Response } from 'express';
import usersRouter from '../modules/users/routes/users.routes';
import sensorReadingRoutes from '../modules/sensorsReading/routes/sensorsReading.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sensorsReading', sensorReadingRoutes);


export default routes;