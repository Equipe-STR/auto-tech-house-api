import { Router } from "express";
import { AIController } from "../controllers/AIController";

const iaRoutes = Router();
const aiController = new AIController();

iaRoutes.post('/', aiController.predict);

export default iaRoutes;