import { CreateRuralProducerController } from "@controllers/rural-producer/create-rural-producer.controller"
import { DeleteRuralProducerController } from "@controllers/rural-producer/delete-rural-producer.controller";
import { GetRuralProducerByIdController } from "@controllers/rural-producer/get-rural-producer-by-id.controller";
import { SQLiteFarmRepository } from "@repositories/farm/sqlite-farm.repository";
import { SQLiteRuralProducerRepository } from "@repositories/rural-producer/sqlite-rural-producer.repository";
import { CreateFarmUseCase } from "@useCases/farm/create-farm.use-case";
import { CreateRuralProducerUseCase } from "@useCases/rural-producer/create-rural-producer.use-case";
import { DeleteRuralProducerUseCase } from "@useCases/rural-producer/delete-rural-producer.use-case";
import { GetRuralProducerByIdUseCase } from "@useCases/rural-producer/get-rural-producer-by-id.use-case";

export const makeCreateRuralProducerController = (): CreateRuralProducerController => {
    const repository = new SQLiteRuralProducerRepository();
    const farmRepository = new SQLiteFarmRepository();
    const createFarmUseCase = new CreateFarmUseCase(farmRepository);
    const useCase = new CreateRuralProducerUseCase(repository, createFarmUseCase);

    return new CreateRuralProducerController(useCase);
}


export const makeGetRuralProducerByIdController = (): GetRuralProducerByIdController => {
    const repository = new SQLiteRuralProducerRepository();
    const useCase = new GetRuralProducerByIdUseCase(repository);

    return new GetRuralProducerByIdController(useCase);
}

export const makeDeleteRuralProducerController = (): DeleteRuralProducerController => {
    const repository = new SQLiteRuralProducerRepository();
    const getUseCase = new GetRuralProducerByIdUseCase(repository);
    const useCase = new DeleteRuralProducerUseCase(repository, getUseCase);

    return new DeleteRuralProducerController(useCase);
}
