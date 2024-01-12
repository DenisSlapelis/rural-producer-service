import { CreateRuralProductorParams } from "@dtos/rural-productor.dto";
import { Document } from "./value-objects/document.value-object";
import { Farm } from "./farm.entity";

export class RuralProductor {
    readonly document: Document;
    readonly name: string;
    readonly farm: Farm;

    constructor(params: CreateRuralProductorParams) {
        this.document = Document.create(params.document);
        this.name = params.name;
        this.farm = new Farm(params.farm);
    }
}
