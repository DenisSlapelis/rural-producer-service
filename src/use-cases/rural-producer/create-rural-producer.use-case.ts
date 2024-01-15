import { CreateRuralProducerDTO } from '@dtos/rural-producer.dto';
import { RuralProducer } from '@entities/rural-producer.entity';
import { RuralProducerRepository } from '@interfaces/rural-producer-repository.interface';
import { CreateFarmUseCase } from '@useCases/farm/create-farm.use-case';
import { injectable } from "tsyringe";

@injectable()
export class CreateRuralProducerUseCase {
    constructor(private repository: RuralProducerRepository, private createFarm: CreateFarmUseCase) {
    }

    create = async (params: CreateRuralProducerDTO) => {
        const instance = new RuralProducer(params);

        await this.checkIfExists(instance.document.value);

        const { id: farmId } = await this.createFarm.create({ ...params.farm, createdBy: params.createdBy });

        const { id } = await this.repository.create(this.toModelFormat(instance, params.createdBy, farmId));

        return this.toResponseFormat(instance, id, farmId);
    }

    private checkIfExists = async (document: string): Promise<void> => {
        const exists = await this.repository.get({ document });

        if (exists) throw new Error(`Rural Producer already exists (id: ${exists.id}).`, { cause: 'Validation Error' });
    }

    private toModelFormat(instance: RuralProducer, createdBy: number, farmId: number) {
        return {
            document: instance.document.value,
            name: instance.name,
            farmId,
            createdBy,
        }
    }

    private toResponseFormat(instance: RuralProducer, id: number, farmId: number) {
        return {
            id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
            farm: {
                id: farmId,
                name: instance.farm.name,
                city: instance.farm.city,
                state: instance.farm.state,
                agriculturalArea: instance.farm.agriculturalArea,
                vegetationArea: instance.farm.vegetationArea,
                totalArea: instance.farm.totalArea.value,
                crops: instance.farm.crops.map(crop => crop?.name?.value || crop),
            },
        }
    }
}
