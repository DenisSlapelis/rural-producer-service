export class Document {
    private document: string;
    private static readonly CPF_SIZE = 11;
    private static readonly CNPJ_SIZE = 14;

    private constructor(document: string) {
        this.document = document;
    }

    static create(value: string): Document {
        this.validate(value);

        return new Document(this.formatDocumentWithoutMask(value));
    }

    public get value(): string {
        return this.document;
    }

    static formatDocumentWithoutMask(document: string) {
        if (!document) throw new Error('Invalid Document', { cause: 'Validation Error' });

        return document.replaceAll(/[.\-/]/g, '');
    }

    formatDocumentOutputWithMask(): string {
        const formatFunctionBySize = {
            [Document.CPF_SIZE]: this.cpfFormat,
            [Document.CNPJ_SIZE]: this.cnpjFormat,
        }

        const size = this.document.length;

        const formatFunction = formatFunctionBySize[size];

        if (!formatFunction) return this.document;

        return formatFunction();
    }

    private cpfFormat = (): string => {
        return this.document.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
    }

    private cnpjFormat = (): string => {
        return this.document.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
    }

    private static validateCpf = (document: string): boolean => {
        // TODO: cpf validation
        return true;
    }

    private static validateCnpj = (document: string): boolean => {
        // TODO: cnpj validation
        return true;
    }

    static validate(value: string) {
        const document = this.formatDocumentWithoutMask(value);

        const validateDocumentBySize = {
            [this.CPF_SIZE]: this.validateCpf,
            [this.CNPJ_SIZE]: this.validateCnpj,
        }

        const size = document.length;

        const validateFunction = validateDocumentBySize[size]

        if (!validateFunction) throw new Error('Invalid Document', { cause: 'Validation Error' });

        return validateFunction();
    }
}
