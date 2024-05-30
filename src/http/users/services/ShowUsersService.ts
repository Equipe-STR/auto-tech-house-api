import { User } from "@prisma/client";
import { AppError } from "./../../../middlewares/errors/AppError";
import { prismaC } from "../../../utils/prisma";


export class ShowUsersService {
  public async execute(id: string): Promise<User> {
    const user = await prismaC.user.findUnique({
        "where":{id}
    });
    if (!user){
        throw new AppError("User not Found", 404);
    }
    return user;
  }
}