import { Document } from "@entities/value-objects/document.value-object";

describe('Document validator', () => {
    describe('Input Formatters', () => {
        test('Should format in a valid input format (CPF - just numbers)', () => {
            const document = '01648057020';

            expect(Document.formatDocumentWithoutMask(document)).toBe('01648057020');
        });

        test('Should format in a valid input format (CPF - other characters)', () => {
            const document = '016.480.570-20';

            expect(Document.formatDocumentWithoutMask(document)).toBe('01648057020');
        });

        test('Should format in a valid input format (CNPJ - just numbers)', () => {
            const document = '29468708000153';

            expect(Document.formatDocumentWithoutMask(document)).toBe('29468708000153');
        });

        test('Should format in a valid input format (CNPJ - other characters)', () => {
            const document = '29.468.708/0001-53';

            expect(Document.formatDocumentWithoutMask(document)).toBe('29468708000153');
        });

        test('Should throw an error when value is empty', () => {
            const document = '';

            expect(() => {
                Document.formatDocumentWithoutMask(document)
            }).toThrow();
        });
    });

    describe('CPF validations', () => {
        test('Should accept valid document (just numbers)', () => {
            const document = '01648057020';

            expect(Document.validate(document)).toBe(true);
        });

        test('Should accept valid document (other characters)', () => {
            const document = '016.480.570-20';

            expect(Document.validate(document)).toBe(true);
        });
    });

    describe('CNPJ validations', () => {
        test('Should accept valid document (just numbers)', () => {
            const document = '29468708000153';

            expect(Document.validate(document)).toBe(true);
        });

        test('Should accept valid document (other characters)', () => {
            const document = '29.468.708/0001-53';

            expect(Document.validate(document)).toBe(true);
        });
    });
});
