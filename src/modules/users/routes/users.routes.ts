import { Router } from "express";
import { UsersController } from "../controllers/UsersController";
import { AuthenticateController } from "../controllers/AuthController";
import { ensureAuthenticate } from "../../../middlewares/ensureAuthenticate/ensureAuthenticate";


const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post('/', ensureAuthenticate, usersController.create);
usersRouter.get('/', ensureAuthenticate, usersController.list);
usersRouter.get('/:id', ensureAuthenticate, usersController.list);
usersRouter.put('/:id', ensureAuthenticate, usersController.update);
usersRouter.delete('/:id', ensureAuthenticate, usersController.delete);

export default usersRouter;
