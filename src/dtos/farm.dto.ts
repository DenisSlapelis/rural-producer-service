import { Crop } from "@entities/crop.entity";
import { CreateDTO } from "./generic.dto";

export interface CreateFarmDTO {
    name: string;
    city: string;
    state: string;
    agriculturalArea: number;
    vegetationArea: number;
    totalArea: number;
    crops: Crop[];
}

export interface CreateFarmModelDTO extends CreateFarmDTO, CreateDTO { };

export interface GetFarmByIdUseCaseResponse {
    id: number;
    name: string;
    city: string;
    state: string;
    agriculturalArea: number;
    vegetationArea: number;
    totalArea: number;
    crops: string[];
}
