import { CreateRuralProducerModelDTO } from "@dtos/rural-producer.dto";

export interface RuralProducerRepository {
    create(params: CreateRuralProducerModelDTO);
    list(filter: any);
    get(filter: any);
    getById(id: number);
    update();
    delete(id: number, deletedBy: number);
}
