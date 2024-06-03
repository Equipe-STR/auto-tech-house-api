import { prismaC } from "../../../utils/prisma";


export class DeleteSensoreReadingService {
  public async execute() {
    await prismaC.sensorReading.deleteMany();
  }
}