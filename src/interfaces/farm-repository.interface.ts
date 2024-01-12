import { CreateFarmModelDTO } from "@dtos/farm.dto";

export interface FarmRepository {
    create(params: CreateFarmModelDTO);
    getById(id: number);
}
