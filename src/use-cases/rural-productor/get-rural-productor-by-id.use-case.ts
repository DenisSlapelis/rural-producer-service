import { RuralProductor } from '@entities/rural-productor.entity';
import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { inject, injectable } from "tsyringe";

@injectable()
export class GetRuralProductorByIdUseCase {
    constructor(@inject('RuralProductorRepository') private repository: RuralProductorRepository) {
    }

    getById = async (id: number) => {
        const result = await this.repository.getById(id);

        if (!result) throw new Error(`No Rural Productors found with id ${id}`, { cause: 'Not Found' });

        return this.toResponseFormat(result);
    }

    private toResponseFormat(result) {
        const instance = new RuralProductor(result);

        return {
            id: result.id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
        }
    }
}
