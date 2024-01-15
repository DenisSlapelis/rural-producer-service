import { CropVO } from "./value-objects/crop.value-object";

export class Crop {
    readonly name: CropVO;

    constructor(name: string) {
        this.name = CropVO.create(name);
    }
}
