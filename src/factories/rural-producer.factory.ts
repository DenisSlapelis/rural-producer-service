import { CreateRuralProducerController } from "@controllers/rural-producer/create-rural-producer.controller"
import { DeleteRuralProducerController } from "@controllers/rural-producer/delete-rural-producer.controller";
import { GetRuralProducerByIdController } from "@controllers/rural-producer/get-rural-producer-by-id.controller";
import { SQLiteRuralProducerRepository } from "@repositories/rural-producer/sqlite-rural-producer.repository";
import { CreateRuralProducerUseCase } from "@useCases/rural-producer/create-rural-producer.use-case";
import { DeleteRuralProducerUseCase } from "@useCases/rural-producer/delete-rural-producer.use-case";
import { GetRuralProducerByIdUseCase } from "@useCases/rural-producer/get-rural-producer-by-id.use-case";
import { makeCreateFarmUseCase, makeGetFarmUseCase } from "./farm.factory";

// Controllers
export const makeCreateRuralProducerController = (): CreateRuralProducerController => {
    const useCase = makeCreateRuralProducerUseCase();

    return new CreateRuralProducerController(useCase);
}

export const makeGetRuralProducerByIdController = (): GetRuralProducerByIdController => {
    const useCase = makeGetRuralProducerByIdUseCase();

    return new GetRuralProducerByIdController(useCase);
}

export const makeDeleteRuralProducerController = (): DeleteRuralProducerController => {
    const useCase = makeDeleteRuralProducerUseCase();

    return new DeleteRuralProducerController(useCase);
}

// Use Cases
export const makeCreateRuralProducerUseCase = () => {
    const repository = new SQLiteRuralProducerRepository();
    const createFarmUseCase = makeCreateFarmUseCase();

    return new CreateRuralProducerUseCase(repository, createFarmUseCase);
}

export const makeGetRuralProducerByIdUseCase = () => {
    const repository = new SQLiteRuralProducerRepository();
    const getFarmUseCase = makeGetFarmUseCase();

    return new GetRuralProducerByIdUseCase(repository, getFarmUseCase);
}

export const makeDeleteRuralProducerUseCase = () => {
    const repository = new SQLiteRuralProducerRepository();
    const getUseCase = makeGetRuralProducerByIdUseCase();

    return new DeleteRuralProducerUseCase(repository, getUseCase);
}
