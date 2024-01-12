import { CreateFarmDTO } from "@dtos/farm.dto";
import { TotalArea } from "./value-objects/total-area.value-object";

export class Farm {
    readonly name: string;
    readonly city: string;
    readonly state: string;
    readonly agriculturalArea: number;
    readonly vegetationArea: number;
    readonly totalArea: TotalArea;
    // crops: Crop[];

    constructor(params: CreateFarmDTO) {
        const { agriculturalArea, vegetationArea, totalArea } = params;
        this.name = params.name;
        this.city = params.city;
        this.state = params.state;
        this.agriculturalArea = agriculturalArea;
        this.vegetationArea = vegetationArea;
        this.totalArea = TotalArea.create(agriculturalArea, vegetationArea, totalArea);
    }
}
