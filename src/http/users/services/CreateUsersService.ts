import { hash } from 'bcrypt';
import { AppError } from '../../../middlewares/errors/AppError';
import { prismaC } from "../../../utils/prisma";
import { User } from '../dtos/UserDTO';

export class CreateUsersService {
    public async execute(data: User): Promise<User> {
        try {
            const password_hash = await hash(data.password, 6);
            const user = await prismaC.user.create({
                data: {
                    email: data.email,
                    password: password_hash,
                    name: data.name
                },
            });
            return user;
        } catch (err) {
          throw new AppError(`${err}`, 404);
        }
    }
}
