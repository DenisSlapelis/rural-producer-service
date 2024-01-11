import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { inject, injectable } from "tsyringe";
import { GetRuralProductorByIdUseCase } from './get-rural-productor-by-id.use-case';

@injectable()
export class DeleteRuralProductorUseCase {
    constructor(
        @inject('RuralProductorRepository') private repository: RuralProductorRepository,
        @inject('GetRuralProductorByIdUseCase') private geByIdUseCase: GetRuralProductorByIdUseCase
    ) {
    }

    delete = async (id: number, deletedBy: number) => {
        await this.checkIfExists(id);

        await this.repository.delete(id, deletedBy);
    }

    private async checkIfExists(id: number) {
        await this.geByIdUseCase.getById(id);
    }
}
