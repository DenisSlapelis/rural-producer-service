import { CreateFarmModelDTO } from '@dtos/farm.dto';
import { Farm } from '@entities/farm.entity';
import { FarmRepository } from '@interfaces/farm-repository.interface';
import { injectable } from "tsyringe";

@injectable()
export class CreateFarmUseCase {
    constructor(private repository: FarmRepository) {
    }

    create = async (params: CreateFarmModelDTO) => {
        const instance = new Farm(params);

        const { id } = await this.repository.create(this.toModelFormat(instance, params.createdBy));

        return this.toResponseFormat(instance, id);
    }

    private toModelFormat(instance: Farm, createdBy: number) {
        return {
            name: instance.name,
            city: instance.city,
            state: instance.state,
            agriculturalArea: instance.agriculturalArea,
            vegetationArea: instance.vegetationArea,
            totalArea: instance.totalArea,
            createdBy,
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
        }
    }
}
