import { SensorReading } from "@prisma/client";
import { AppError } from "middlewares/errors/AppError";
import { prismaC } from "../../../utils/prisma";


export class ListSensorsReadingService {
  public async execute(): Promise<SensorReading[]> {
    const sensorsReading = await prismaC.sensorReading.findMany({
        orderBy: {
          date: 'desc'
        },
        take: 20
      });
    return sensorsReading;
  }
}