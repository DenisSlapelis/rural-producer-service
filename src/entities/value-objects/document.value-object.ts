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
        if (document.length != Document.CPF_SIZE) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        if (/^(\d)\1{10}$/.test(document)) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        let sum = 0;

        for (let i = 0; i < 9; i++) {
            sum += parseInt(document.charAt(i)) * (10 - i);
        }

        let firstDigit = 11 - (sum % 11);

        firstDigit = firstDigit > 9 ? 0 : firstDigit;

        if (parseInt(document.charAt(9)) != firstDigit) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        sum = 0;
        for (let i = 0; i < 10; i++) {
            sum += parseInt(document.charAt(i)) * (11 - i);
        }

        let secondDigit = 11 - (sum % 11);

        secondDigit = secondDigit > 9 ? 0 : secondDigit;

        if (parseInt(document.charAt(10)) != secondDigit) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        return true;
    }

    private static validateCnpj = (document: string): boolean => {
        if (document.length != Document.CNPJ_SIZE) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        if (/^(\d)\1{13}$/.test(document)) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        let sum = 0;
        let multiplier = 5;

        for (let i = 0; i < 12; i++) {
            sum += parseInt(document.charAt(i)) * multiplier;
            multiplier = multiplier == 2 ? 9 : multiplier - 1;
        }

        let firstDigit = 11 - (sum % 11);
        firstDigit = firstDigit > 9 ? 0 : firstDigit;

        if (parseInt(document.charAt(12)) != firstDigit) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        sum = 0;
        multiplier = 6;
        for (let i = 0; i < 13; i++) {
            sum += parseInt(document.charAt(i)) * multiplier;
            multiplier = multiplier == 2 ? 9 : multiplier - 1;
        }
        let secondDigit = 11 - (sum % 11);
        secondDigit = secondDigit > 9 ? 0 : secondDigit;

        if (parseInt(document.charAt(13)) != secondDigit) {
            throw new Error('Invalid Document', { cause: 'Validation Error' });
        }

        return true;
    }

    static validate(value: string) {
        const document = this.formatDocumentWithoutMask(value);

        const validateDocumentBySize = {
            [this.CPF_SIZE]: this.validateCpf,
            [this.CNPJ_SIZE]: this.validateCnpj,
        }

        const size = document.length;

        const validateFunction = validateDocumentBySize[size];

        if (!validateFunction) throw new Error('Invalid Document', { cause: 'Validation Error' });

        return validateFunction(document);
    }
}
