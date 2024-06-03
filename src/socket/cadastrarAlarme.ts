import { CreateSensorsReadingService } from "../modules/sensorsReading/services/CreateSensorsReadingService";

export async function alarmeAtivadoBanco(){
    console.log("alarmeAtivadoBanco")
    const createSensorsService = new CreateSensorsReadingService()
    const user = await createSensorsService.execute({
        name:"ALARME ATIVADO",
        read: 1
    });
}

export async function alarmeDesativadoBanco(){
    const createSensorsService = new CreateSensorsReadingService()
    const user = await createSensorsService.execute({
        name:"ALARME DESATIVADO",
        read: 0
    });
}
export async function incendioAtivadoBanco(){
    const createSensorsService = new CreateSensorsReadingService()
    const user = await createSensorsService.execute({
        name:"INCENDIO ATIVADO",
        read: 1
    });
}
export async function incendioDesativadoBanco(){
    const createSensorsService = new CreateSensorsReadingService()
    const user = await createSensorsService.execute({
        name:"INCENDIO DESATIVADO",
        read: 0
    });
}