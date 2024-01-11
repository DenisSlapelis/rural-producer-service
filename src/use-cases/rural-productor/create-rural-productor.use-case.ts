import { CreateRuralProductorModelDTO } from '@dtos/rural-productor.dto';
import { RuralProductor } from '@entities/rural-productor.entity';
import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { inject, injectable } from "tsyringe";

@injectable()
export class CreateRuralProductorUseCase {
    constructor(@inject('RuralProductorRepository') private repository: RuralProductorRepository) {
    }

    create = async (params: CreateRuralProductorModelDTO) => {
        const instance = new RuralProductor(params);

        await this.checkIfExists(instance.document.value);

        const { id } = await this.repository.create(this.toModelFormat(instance, params.createdBy));

        return this.toResponseFormat(instance, id);
    }

    private async checkIfExists(document: string) {
        const exists = await this.repository.get({
            where: {
                document,
            }
        });

        if (exists) throw new Error(`Rural Productor already exists (id: ${exists.id}).`, { cause: 'Validation Error' });
    }

    private toModelFormat(ruralProductor: RuralProductor, createdBy: number) {
        return {
            document: ruralProductor.document.value,
            name: ruralProductor.name,
            createdBy,
        }
    }

    private toResponseFormat(instance: RuralProductor, id: number) {
        return {
            id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
        }
    }
}
