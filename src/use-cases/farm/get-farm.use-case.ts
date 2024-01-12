import { GetFarmByIdUseCaseResponse } from '@dtos/farm.dto';
import { Farm } from '@entities/farm.entity';
import { FarmRepository } from '@interfaces/farm-repository.interface';
import { FarmDB } from 'src/config/database/models/sequelize-farm.model';
import { injectable } from "tsyringe";

@injectable()
export class GetFarmUseCase {
    constructor(private repository: FarmRepository) {
    }

    getById = async (id: number): Promise<GetFarmByIdUseCaseResponse> => {
        const result = await this.repository.getById(id);

        if (!result) throw new Error(`No Farms found with id ${id}`, { cause: 'Not Found' });

        return this.toResponseFormat(result);
    }

    private toResponseFormat(result: FarmDB): GetFarmByIdUseCaseResponse {
        const instance = new Farm(result);

        return {
            id: result.id,
            name: instance.name,
            city: instance.city,
            state: instance.state,
            agriculturalArea: instance.agriculturalArea,
            vegetationArea: instance.vegetationArea,
            totalArea: instance.totalArea,
        }
    }
}
