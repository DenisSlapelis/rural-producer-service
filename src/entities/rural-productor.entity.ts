// import { Farm } from "./farm.entity";
import { CreateRuralProductorDTO } from "@dtos/rural-productor.dto";
import { Document } from "./value-objects/document.value-object";

export class RuralProductor {
    document: Document;
    readonly name: string;
    // readonly farm: Farm;

    constructor(params: CreateRuralProductorDTO) {
        this.document = Document.create(params.document);
        this.name = params.name;
        // this.farm = params.farm;
    }
}
