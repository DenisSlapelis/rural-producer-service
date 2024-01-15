import { GetFarmByIdUseCaseResponse } from '@dtos/farm.dto';
import { Crop } from '@entities/crop.entity';
import { Farm } from '@entities/farm.entity';
import { FarmRepository } from '@interfaces/farm-repository.interface';
import { FarmDB } from '../../config/database/models/sequelize-farm.model';
import { injectable } from "tsyringe";

@injectable()
export class GetFarmUseCase {
    constructor(private repository: FarmRepository) {
    }

    getById = async (id: number): Promise<GetFarmByIdUseCaseResponse> => {
        const result = await this.repository.getById(id);

        if (!result) throw new Error(`No Farms found with id ${id}`, { cause: 'Not Found' });

        const crops = await this.repository.getCrops(id);

        return this.toResponseFormat(result, crops);
    }

    private toResponseFormat(result: FarmDB, crops: Crop[]): GetFarmByIdUseCaseResponse {
        const instance = new Farm({ ...result, crops });

        return {
            id: result.id,
            name: instance.name,
            city: instance.city,
            state: instance.state,
            agriculturalArea: instance.agriculturalArea,
            vegetationArea: instance.vegetationArea,
            totalArea: instance.totalArea.value,
            crops: crops.map(crop => crop.name.value),
        }
    }
}
