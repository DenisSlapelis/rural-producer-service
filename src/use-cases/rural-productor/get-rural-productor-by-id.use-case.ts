import { GetRuralProductorByIdUseCaseResponse } from '@dtos/rural-productor.dto';
import { RuralProductor } from '@entities/rural-productor.entity';
import { IGetRuralProductorByIdUseCase } from '@interfaces/get-rural-productor-by-id-use-case.interface';
import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { inject, injectable } from "tsyringe";

@injectable()
export class GetRuralProductorByIdUseCase implements IGetRuralProductorByIdUseCase {
    constructor(@inject('RuralProductorRepository') private repository: RuralProductorRepository) {
    }

    getById = async (id: number): Promise<GetRuralProductorByIdUseCaseResponse> => {
        const result = await this.repository.getById(id);

        if (!result) throw new Error(`No Rural Productors found with id ${id}`, { cause: 'Not Found' });

        return this.toResponseFormat(result);
    }

    private toResponseFormat(result): GetRuralProductorByIdUseCaseResponse {
        const instance = new RuralProductor(result);

        return {
            id: result.id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
        }
    }
}
