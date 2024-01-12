import { SQLiteFarmRepository } from "@repositories/farm/sqlite-farm.repository";
import { CreateFarmUseCase } from "@useCases/farm/create-farm.use-case";
import { GetFarmUseCase } from "@useCases/farm/get-farm.use-case";

export const makeCreateFarmUseCase = () => {
    const farmRepository = new SQLiteFarmRepository();

    return new CreateFarmUseCase(farmRepository);
}

export const makeGetFarmUseCase = () => {
    const repository = new SQLiteFarmRepository();

    return new GetFarmUseCase(repository);
}

