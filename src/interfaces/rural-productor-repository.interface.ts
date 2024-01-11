import { CreateRuralProductorModelDTO } from "@dtos/rural-productor.dto";

export interface RuralProductorRepository {
    create(params: CreateRuralProductorModelDTO);
    list(filter: any);
    get(filter: any);
    getById(id: number);
    update();
    delete();
}
