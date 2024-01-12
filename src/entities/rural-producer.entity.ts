import { CreateRuralProducerParams } from "@dtos/rural-producer.dto";
import { Document } from "./value-objects/document.value-object";
import { Farm } from "./farm.entity";

export class RuralProducer {
    readonly document: Document;
    readonly name: string;
    readonly farm: Farm;

    constructor(params: CreateRuralProducerParams) {
        this.document = Document.create(params.document);
        this.name = params.name;
        this.farm = new Farm(params.farm);
    }
}
