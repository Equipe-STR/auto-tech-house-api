import { User } from "@prisma/client";
import { AppError } from "middlewares/errors/AppError";
import { prismaC } from "../../../utils/prisma";


export class DeleteUsersService {
  public async execute(id: string) {
    const user = await prismaC.user.findUnique({
        "where":{id}
    });
    await prismaC.user.delete({
        "where":{id}
    });
  }
}