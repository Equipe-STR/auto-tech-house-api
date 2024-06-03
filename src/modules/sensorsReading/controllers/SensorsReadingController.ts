import {Request, Response} from "express"
import Zod from 'zod';
import { CreateSensorsReadingService } from "../services/CreateSensorsReadingService";
import { wss } from "../../../app";
import { ListSensorsReadingService } from "../services/ListSensorsReadingService";
import { DeleteSensoreReadingService } from "../services/DeleteSensoresReadingService";

export class SensorsReadingController {
    public async list(_request: Request, response: Response){
        const listSensorsReadingService = new ListSensorsReadingService()
        const sensorsReading = await listSensorsReadingService.execute()
        response = response.status(200).json(sensorsReading);
    }
    async create(request: Request, response: Response): Promise<Response> {
        const bodySchema = Zod.object({
            name: Zod.string(),
            read: Zod.number(),
        }).strict();
        let {name, read} = bodySchema.parse(request.body);
        const createSensorsService = new CreateSensorsReadingService()
        const user = await createSensorsService.execute({
          name,
          read
        });
        return response.json(user);
      }
    public async delete(request: Request, response: Response){
        const id = request.params.id;
        const deleteUsersService = new DeleteSensoreReadingService()
        const users = await deleteUsersService.execute()
        response = response.status(200).json({});
    }
}