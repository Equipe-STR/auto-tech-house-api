import { Router } from "express";
import { AuthenticateController } from "../controllers/AuthController";


const authRoutes = Router();
const authController = new AuthenticateController();

authRoutes.post('/', authController.create);


export default authRoutes;