import { Crop } from '@entities/crop.entity';
import { CropRepository } from '@interfaces/crop-repository.interface';
import { FarmRepository } from '@interfaces/farm-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class CreateFarmCropUseCase {
    constructor(private repository: FarmRepository, private cropsRepository: CropRepository) {
    }

    create = async (farmId: number, crops: Crop[], createdBy: number) => {
        const cropList = await this.cropsRepository.getList(crops.map(crop => crop.name.value));

        const cropIds = cropList.map(row => row.id);

        await this.repository.addCrops(farmId, cropIds, createdBy);
    }
}
