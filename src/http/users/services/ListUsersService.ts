import { User } from "@prisma/client";
import { AppError } from "middlewares/errors/AppError";
import { prismaC } from "../../../utils/prisma";


export class ListUsersService {
  public async execute(): Promise<User[]> {
    const users = await prismaC.user.findMany();
    return users;
  }
}