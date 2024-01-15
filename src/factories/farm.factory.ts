import { SQLiteCropRepository } from "@repositories/crop/sqlite-crop.repository";
import { SQLiteFarmRepository } from "@repositories/farm/sqlite-farm.repository";
import { CreateFarmCropUseCase } from "@useCases/farm/create-farm-crop.use-case";
import { CreateFarmUseCase } from "@useCases/farm/create-farm.use-case";
import { GetFarmUseCase } from "@useCases/farm/get-farm.use-case";

export const makeCreateFarmUseCase = () => {
    const cropRepository = new SQLiteCropRepository();
    const farmRepository = new SQLiteFarmRepository(cropRepository);
    const createFarmCropUseCase = makeCreateFarmCropUseCase();

    return new CreateFarmUseCase(farmRepository, createFarmCropUseCase);
}

export const makeGetFarmUseCase = () => {
    const cropRepository = new SQLiteCropRepository();
    const repository = new SQLiteFarmRepository(cropRepository);

    return new GetFarmUseCase(repository);
}

export const makeCreateFarmCropUseCase = () => {
    const cropRepository = new SQLiteCropRepository();
    const repository = new SQLiteFarmRepository(cropRepository);
    const cropsRepository = new SQLiteCropRepository();

    return new CreateFarmCropUseCase(repository, cropsRepository);
}
