import { CreateDTO } from "./generic.dto";
import { CreateFarmDTO, GetFarmByIdUseCaseResponse } from "./farm.dto";

export interface CreateRuralProducerParams {
    document: string;
    name: string;
    farm: CreateFarmDTO;
}

export interface CreateRuralProducerDTO extends CreateRuralProducerParams, CreateDTO {
}

export interface CreateRuralProducerModelDTO extends CreateDTO {
    document: string;
    name: string;
    farmId: number;
};

export interface GetRuralProducerByIdUseCaseResponse {
    id: number;
    document: string;
    name: string;
    farm: GetFarmByIdUseCaseResponse;
}
