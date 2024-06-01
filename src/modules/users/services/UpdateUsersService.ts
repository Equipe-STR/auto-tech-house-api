import { hash } from 'bcrypt';
import { AppError } from '../../../middlewares/errors/AppError';
import { prismaC } from "../../../utils/prisma";
import { User } from '@prisma/client';

export class UpdateUsersService {
    public async execute({name, email, id, password}: User): Promise<User> {
        
        const userExist = await prismaC.user.findUnique({
            "where":{id}
        });
        if (!userExist){
            throw new AppError("User not Found", 404);
        }
        const password_hash = await hash(password, 6);
        let data= {}
        if(name) data = {name};
        if(email) data = {...data, email};
        if(password) data = {...data, "password":password_hash};
        try {
            const user = await prismaC.user.update({
            where:{id},
            data,
            });
            return user;
        } catch (err) {
          throw new AppError(`${err}`, 404);
        }
    }
}
