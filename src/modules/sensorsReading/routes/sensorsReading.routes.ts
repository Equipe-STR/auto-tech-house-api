import { Router } from "express";
import { SensorsReadingController } from "../controllers/SensorsReadingController";
import { ensureAuthenticate } from "../../../middlewares/ensureAuthenticate/ensureAuthenticate";


const sensorReadingRoutes = Router();
const sensorsReadingController = new SensorsReadingController();

sensorReadingRoutes.post('/', ensureAuthenticate, sensorsReadingController.create);
sensorReadingRoutes.get('/', ensureAuthenticate, sensorsReadingController.list);
sensorReadingRoutes.delete('/:id', ensureAuthenticate, sensorsReadingController.delete);

export default sensorReadingRoutes;