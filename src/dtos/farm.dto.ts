import { CreateDTO } from "./generic.dto";

export interface CreateFarmDTO {
    name: string;
    city: string;
    state: string;
    agriculturalArea: number;
    vegetationArea: number;
    totalArea: number;
}

export interface CreateFarmModelDTO extends CreateFarmDTO, CreateDTO { };
