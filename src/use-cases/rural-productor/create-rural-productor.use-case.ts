import { CreateRuralProductorDTO } from '@dtos/rural-productor.dto';
import { RuralProductor } from '@entities/rural-productor.entity';
import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { CreateFarmUseCase } from '@useCases/farm/create-farm.use-case';
import { injectable } from "tsyringe";

@injectable()
export class CreateRuralProductorUseCase {
    constructor(private repository: RuralProductorRepository, private createFarm: CreateFarmUseCase) {
    }

    create = async (params: CreateRuralProductorDTO) => {
        const instance = new RuralProductor(params);

        await this.checkIfExists(instance.document.value);

        const { id: farmId } = await this.createFarm.create({ ...params.farm, createdBy: params.createdBy });

        const { id } = await this.repository.create(this.toModelFormat(instance, params.createdBy, farmId));

        return this.toResponseFormat(instance, id, farmId);
    }

    private checkIfExists = async (document: string): Promise<void> => {
        const exists = await this.repository.get({
            where: {
                document,
            }
        });

        if (exists) throw new Error(`Rural Productor already exists (id: ${exists.id}).`, { cause: 'Validation Error' });
    }

    private toModelFormat(instance: RuralProductor, createdBy: number, farmId: number) {
        return {
            document: instance.document.value,
            name: instance.name,
            farmId,
            createdBy,
        }
    }

    private toResponseFormat(instance: RuralProductor, id: number, farmId: number) {
        return {
            id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
            farm: { id: farmId, ...instance.farm },
        }
    }
}
