import { RegressionModelSingleton } from '../../../utils/modelAI';
import { AppError } from '../../../middlewares/errors/AppError';
import { SensorLDR } from '../dtos/sensorLDR';


export class PrevisaoIA {
    public async execute({right, left}: SensorLDR) {
        try {
            const regressionModel = await RegressionModelSingleton.getInstance();
            return {"resultado": regressionModel.predict([right, left])};
        } catch (err) {
          throw new AppError(`Erro ao tentar acessar o banco\n${err}`, 404);
        }
    }
}