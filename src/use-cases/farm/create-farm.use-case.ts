import { CreateFarmModelDTO } from '@dtos/farm.dto';
import { Farm } from '@entities/farm.entity';
import { FarmRepository } from '@interfaces/farm-repository.interface';
import { injectable } from "tsyringe";
import { CreateFarmCropUseCase } from './create-farm-crop.use-case';

@injectable()
export class CreateFarmUseCase {
    constructor(private repository: FarmRepository, private createFarmCrop: CreateFarmCropUseCase) {
    }

    create = async (params: CreateFarmModelDTO) => {
        const instance = new Farm(params);

        // TODO: Add transaction for the next methods
        const { id } = await this.repository.create(this.toModelFormat(instance, params.createdBy));

        await this.createFarmCrop.create(id, instance.crops, params.createdBy);

        return this.toResponseFormat(instance, id);
    }

    private toModelFormat(instance: Farm, createdBy: number) {
        return {
            name: instance.name,
            city: instance.city,
            state: instance.state,
            agriculturalArea: instance.agriculturalArea,
            vegetationArea: instance.vegetationArea,
            totalArea: instance.totalArea.value,
            createdBy,
            crops: instance.crops,
        }
    }

    private toResponseFormat(instance: Farm, id: number) {
        return {
            id,
            name: instance.name,
            city: instance.city,
            state: instance.state,
            agriculturalArea: instance.agriculturalArea,
            vegetationArea: instance.vegetationArea,
            totalArea: instance.totalArea,
            crops: instance.crops.map(crop => crop.name.value),
        }
    }
}
