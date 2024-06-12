import { Router, Request, Response } from 'express';
import usersRouter from '../modules/users/routes/users.routes';
import sensorReadingRoutes from '../modules/sensorsReading/routes/sensorsReading.routes';
import authRoutes from '../modules/users/routes/auth.routes';
import iaRoutes from '../modules/ia/routes/ia.routes';
const routes = Router();

routes.use('/users', usersRouter);
routes.use('/sensorsReading', sensorReadingRoutes);
routes.use('/ia', iaRoutes)
routes.use('/auth', authRoutes);



export default routes;