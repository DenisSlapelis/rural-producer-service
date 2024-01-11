import { CreateDTO } from "./generic.dto";

export interface CreateRuralProductorDTO {
    document: string;
    name: string;
}

export interface CreateRuralProductorModelDTO extends CreateRuralProductorDTO, CreateDTO { };

export interface GetRuralProductorByIdUseCaseResponse {
    id: number;
    document: string;
    name: string;
}
