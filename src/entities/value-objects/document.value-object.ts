export class Document {
    private document: string;
    private readonly CPF_SIZE = 11;
    private readonly CNPJ_SIZE = 14;

    constructor(document: string) {
        this.document = this.formatDocumentInput(document);
    }

    private formatDocumentInput(document: string) {
        if (!document) throw new Error('Invalid Document', { cause: 'Validation Error' });

        this.validateDocument();

        return document.replaceAll(/[.\-/]/g, '');
    }

    private formatDocumentOutput() {
        const formatFunctionBySize = {
            [this.CPF_SIZE]: this.cpfFormat,
            [this.CNPJ_SIZE]: this.cnpjFormat,
        }

        const size = this.document.length;

        const formatFunction = formatFunctionBySize[size];

        if (!formatFunction) return this.document;

        return formatFunction();
    }

    private cpfFormat() {
        return this.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    private cnpjFormat() {
        return this.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    private validateCpf() {
        // TODO
        return true;
    }

    private validateCnpj() {
        // TODO
        return true;
    }

    private validateDocument () {
        const validateDocumentBySize = {
            [this.CPF_SIZE]: this.validateCpf,
            [this.CNPJ_SIZE]: this.validateCnpj,
        }

        const size = this.document.length;

        const validateFunction = validateDocumentBySize[size]

        if (!validateFunction) throw new Error('Invalid Document', { cause: 'Validation Error' });

        return validateFunction();
    }

    getDocument() {
        return this.formatDocumentOutput();
    }
}
