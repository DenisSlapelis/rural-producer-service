import { GetRuralProductorByIdUseCaseResponse } from '@dtos/rural-productor.dto';

export interface IGetRuralProductorByIdUseCase {
    getById(id: number): Promise<GetRuralProductorByIdUseCaseResponse>
}
