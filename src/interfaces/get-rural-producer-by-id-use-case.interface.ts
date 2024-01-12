import { GetRuralProducerByIdUseCaseResponse } from '@dtos/rural-producer.dto';

export interface IGetRuralProducerByIdUseCase {
    getById(id: number): Promise<GetRuralProducerByIdUseCaseResponse>
}
