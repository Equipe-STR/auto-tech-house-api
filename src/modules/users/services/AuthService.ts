import { compare, hash } from 'bcrypt';
import { AppError } from '../../../middlewares/errors/AppError';
import { prismaC } from "../../../utils/prisma";
import { sign } from 'jsonwebtoken';

interface AuthUser{
    email: string,
    password: string
}

export class AuthService {
    public async execute({email, password}: AuthUser) {
        const user = await prismaC.user.findFirst({
            "where":{email}
        });

        if (!user){
            throw new AppError("Incorrect email or password", 401);
        }
        const passwordMath = await compare(password, user.password);
        if (!passwordMath){
            throw new AppError("Incorrect email or password", 401);
        }

        const token = sign({}, 'secretIOT', {
            subject: user.id,
            expiresIn: '30d',
        });
        return token;
    }
}