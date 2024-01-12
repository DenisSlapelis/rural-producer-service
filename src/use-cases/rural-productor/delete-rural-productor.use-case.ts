import { RuralProductorRepository } from '@interfaces/rural-productor-repository.interface';
import { GetRuralProductorByIdUseCase } from './get-rural-productor-by-id.use-case';

export class DeleteRuralProductorUseCase {
    constructor(
        private repository: RuralProductorRepository,
        private geByIdUseCase: GetRuralProductorByIdUseCase
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
