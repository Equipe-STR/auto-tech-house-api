import { prismaC } from "../../../utils/prisma";


export class DeleteSensoreReadingService {
  public async execute(id: string) {
    await prismaC.sensorReading.deleteMany();
  }
}