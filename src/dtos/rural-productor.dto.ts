import { CreateDTO } from "./generic.dto";
import { CreateFarmDTO } from "./farm.dto";

export interface CreateRuralProductorParams {
    document: string;
    name: string;
    farm: CreateFarmDTO;
}

export interface CreateRuralProductorDTO extends CreateRuralProductorParams, CreateDTO {
}

export interface CreateRuralProductorModelDTO extends CreateDTO {
    document: string;
    name: string;
    farmId: number;
};

export interface GetRuralProductorByIdUseCaseResponse {
    id: number;
    document: string;
    name: string;
}
