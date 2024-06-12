import {Request, Response} from "express"
import Zod from 'zod';
import { PrevisaoIA } from "../services/previsaoIA";

export class AIController {
    async predict(request: Request, response: Response){
        const bodySchema = Zod.object({
            right: Zod.number(),
            left: Zod.number(),
        }).strict();
        let {right, left} = bodySchema.parse(request.body);
        const previsaoIA = new PrevisaoIA()
        const sensorsReading = await previsaoIA.execute({right, left})
        response = response.status(200).json(sensorsReading);
    }
}