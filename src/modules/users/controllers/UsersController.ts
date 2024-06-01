import {Request, Response} from "express"
import Zod from 'zod';
import { ListUsersService } from "../services/ListUsersService";
import { CreateUsersService } from "../services/CreateUsersService";
import { ShowUsersService } from "../services/ShowUsersService";
import { UpdateUsersService } from "../services/UpdateUsersService";
import { DeleteUsersService } from "../services/DeleteUsersService";

export class UsersController {
    public async list(_request: Request, response: Response){
        const listUsersService = new ListUsersService()
        const users = await listUsersService.execute()
        response = response.status(200).json(users);
    }
    public async show(request: Request, response: Response){
        const id = request.params.id;
        const showUsersService = new ShowUsersService()
        const user = await showUsersService.execute(id)
        response = response.status(200).json(user);
    }
    async create(request: Request, response: Response): Promise<Response> {
        const bodySchema = Zod.object({
            name: Zod.string(),
            email: Zod.string().email(),
            password: Zod.string().min(6)
        }).strict();
        let {name, email, password} = bodySchema.parse(request.body);
        const createUserService = new CreateUsersService()
        const user = await createUserService.execute({
          name,
          email,
          password,
        });
    
        return response.json(user);
      }
    public async update(request:Request, response: Response){
        const bodySchema = Zod.object({
            name: Zod.string().nullish(),
            email: Zod.string().email().nullish(),
            cpf: Zod.string().nullish(),
            status: Zod.number().nullish(),
            password: Zod.string().min(6).nullish(),
        }).strict();
        const {id} = request.params;
        let {name, email, password} = bodySchema.parse(request.body);
        const updateUserService = new UpdateUsersService()
        const user = await updateUserService.execute({
          id,
          name,
          email,
          password,
        });
        return response.status(200).json(user);
    }
    public async delete(request: Request, response: Response){
        const id = request.params.id;
        const deleteUsersService = new DeleteUsersService()
        const users = await deleteUsersService.execute(id)
        response = response.status(200).json({});
    }
}