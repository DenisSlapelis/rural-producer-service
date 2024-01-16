import { CreateRuralProducerModelDTO, UpdateRuralProducerDTO } from "@dtos/rural-producer.dto";

export interface RuralProducerRepository {
    create(params: CreateRuralProducerModelDTO);
    list(filter: any);
    get(filter: any);
    getById(id: number);
    update(id: number, field: UpdateRuralProducerDTO, updatedBy: number);
    delete(id: number, deletedBy: number);
}
