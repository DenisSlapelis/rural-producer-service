import { GetRuralProducerByIdUseCaseResponse } from '@dtos/rural-producer.dto';
import { RuralProducer } from '@entities/rural-producer.entity';
import { IGetRuralProducerByIdUseCase } from '@interfaces/get-rural-producer-by-id-use-case.interface';
import { RuralProducerRepository } from '@interfaces/rural-producer-repository.interface';

export class GetRuralProducerByIdUseCase implements IGetRuralProducerByIdUseCase {
    constructor(private repository: RuralProducerRepository) { }

    getById = async (id: number): Promise<GetRuralProducerByIdUseCaseResponse> => {
        const result = await this.repository.getById(id);

        if (!result) throw new Error(`No Rural Producers found with id ${id}`, { cause: 'Not Found' });

        return this.toResponseFormat(result);
    }

    private toResponseFormat(result): GetRuralProducerByIdUseCaseResponse {
        const instance = new RuralProducer(result);

        return {
            id: result.id,
            document: instance.document.formatDocumentOutputWithMask(),
            name: instance.name,
        }
    }
}
