import { CreateRuralProductorController } from "@controllers/rural-productor/create-rural-productor.controller"
import { DeleteRuralProductorController } from "@controllers/rural-productor/delete-rural-productor.controller";
import { GetRuralProductorByIdController } from "@controllers/rural-productor/get-rural-productor-by-id.controller";
import { SQLiteFarmRepository } from "@repositories/farm/sqlite-farm.repository";
import { SQLiteRuralProductorRepository } from "@repositories/rural-productor/sqlite-rural-productor.repository";
import { CreateFarmUseCase } from "@useCases/farm/create-farm.use-case";
import { CreateRuralProductorUseCase } from "@useCases/rural-productor/create-rural-productor.use-case";
import { DeleteRuralProductorUseCase } from "@useCases/rural-productor/delete-rural-productor.use-case";
import { GetRuralProductorByIdUseCase } from "@useCases/rural-productor/get-rural-productor-by-id.use-case";

export const makeCreateRuralProductorController = (): CreateRuralProductorController => {
    const repository = new SQLiteRuralProductorRepository();
    const farmRepository = new SQLiteFarmRepository();
    const createFarmUseCase = new CreateFarmUseCase(farmRepository);
    const useCase = new CreateRuralProductorUseCase(repository, createFarmUseCase);

    return new CreateRuralProductorController(useCase);
}


export const makeGetRuralProductorByIdController = (): GetRuralProductorByIdController => {
    const repository = new SQLiteRuralProductorRepository();
    const useCase = new GetRuralProductorByIdUseCase(repository);

    return new GetRuralProductorByIdController(useCase);
}

export const makeDeleteRuralProductorController = (): DeleteRuralProductorController => {
    const repository = new SQLiteRuralProductorRepository();
    const getUseCase = new GetRuralProductorByIdUseCase(repository);
    const useCase = new DeleteRuralProductorUseCase(repository, getUseCase);

    return new DeleteRuralProductorController(useCase);
}
