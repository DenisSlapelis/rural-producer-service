import { CreateFarmDTO } from "@dtos/farm.dto";

export class Farm {
    readonly name: string;
    readonly city: string;
    readonly state: string;
    readonly agriculturalArea: number;
    readonly vegetationArea: number;
    readonly totalArea: number;
    // crops: Crop[];

    constructor(params: CreateFarmDTO) {
        this.name = params.name;
        this.city = params.city;
        this.state = params.state;
        this.agriculturalArea = params.agriculturalArea;
        this.vegetationArea = params.vegetationArea;
        this.totalArea = params.totalArea;
    }
}
