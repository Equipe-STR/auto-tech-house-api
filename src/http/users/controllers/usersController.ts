import {Request, Response} from "express"

import { AppError } from "../../../middlewares/errors/AppError";
import Zod from 'zod';
import { hash } from 'bcrypt';
import { prismaC } from "prisma";

export class UsersController {
    public async list(_request: Request, response: Response){
        const users = await prismaC.user.findMany({"select": {
            "name": true,
            "email": true,
          },});
        response = response.status(200).json(users);
    }
    public async show(request: Request, response: Response){
        const id = request.params.id;
        const user = await prismaC.user.findUnique({
            "where":{id},
            "select": {
                "name": true,
                "email": true,
              },
        });
        if (!user){
            throw new AppError("User not Found", 404);
        }
        response = response.status(200).json(user);
    }
    public async create(request:Request, response: Response){
        const bodySchema = Zod.object({
            name: Zod.string(),
            email: Zod.string().email(),
            cpf: Zod.string(),
            status: Zod.number(),
            password: Zod.string().min(6),
        }).strict();
        const {name, email, cpf, status, password} = bodySchema.parse(request.body);
        const password_hash = await hash(password, 6);
        const user = await prismaC.user.create({
           data: {
               email,
               "password": password_hash,
               name,
           },
        });
        return response.status(200).json(user);
    }
    public async update(request:Request, response: Response){
        const id = request.params.id;
        const userExist = await prismaC.user.findUnique({
            "where":{id}
        });
        if (!userExist){
            throw new AppError("User not Found", 404);
        }
        const bodySchema = Zod.object({
            name: Zod.string().nullish(),
            email: Zod.string().email().nullish(),
            cpf: Zod.string().nullish(),
            status: Zod.number().nullish(),
            password: Zod.string().min(6).nullish(),
        }).strict();
        let {name, email, cpf, status, password} = bodySchema.parse(request.body);
        password = password!
        const password_hash = await hash(password, 6);
        let data= {}
        if(name) data = {name};
        if(email) data = {...data, email};
        if(cpf) data = {...data, cpf};
        if(status) data = {...data, status};
        if(password) data = {...data, "password":password_hash};
        const user = await prismaC.user.update({
           where:{id},
           data,
        });
        return response.status(200).json(user);
    }
    public async delete(request: Request, response: Response){
        const id = request.params.id;
        const user = await prismaC.user.findUnique({
            "where":{id}
        });
        if (!user){
            throw new AppError("User not Found", 404);
        }
        await prismaC.user.delete({
            "where":{id}
        });
        response = response.status(200).json({});
    }
     
    /*private async verificaUser(userID){
        const user = await prismaC.user.findUnique({
            "where":{userID}
        });
        if (!user){
            throw new AppError("User not Found", 404);
        }
        return user;
    }*/
}