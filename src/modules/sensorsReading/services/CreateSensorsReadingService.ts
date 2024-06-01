import { hash } from 'bcrypt';
import { AppError } from '../../../middlewares/errors/AppError';
import { prismaC } from "../../../utils/prisma";
import { SensorReading } from '../dtos/sensorsReadDTO';


export class CreateSensorsReadingService {
    public async execute({name, read}: SensorReading) {
        try {
            const sensorReading = await prismaC.sensorReading.create({
                data: {
                    name,
                    read,
                },
            });
            return sensorReading;
        } catch (err) {
          throw new AppError(`Erro ao tentar acessar o banco\n${err}`, 404);
        }
    }
}