import { TotalArea } from "@entities/value-objects/total-area.value-object";

describe('Total area validatons', () => {
    test('Should create a valid total area', () => {
        const agriculturalArea = 10;
        const vegetationArea = 10;
        const total = 20;

        const result = TotalArea.create(agriculturalArea, vegetationArea, total);

        expect(result).toEqual({ total: 20 });
    });

    test('Should create and return a valid total area', () => {
        const agriculturalArea = 10;
        const vegetationArea = 10;
        const total = 20;

        const result = TotalArea.create(agriculturalArea, vegetationArea, total);

        expect(result.value).toEqual(20);
    });

    test('Should throw an error when agriculturalArea is invalid', () => {
        const agriculturalArea = -1;
        const vegetationArea = 10;
        const total = 20;

        expect(() => {
            TotalArea.create(agriculturalArea, vegetationArea, total)
        }).toThrow();
    });

    test('Should throw an error when vegetationArea is invalid', () => {
        const agriculturalArea = 10;
        const vegetationArea = -1;
        const total = 20;

        expect(() => {
            TotalArea.create(agriculturalArea, vegetationArea, total)
        }).toThrow();
    });

    test('Should throw an error when total is invalid', () => {
        const agriculturalArea = 10;
        const vegetationArea = 10;
        const total = 0;

        expect(() => {
            TotalArea.create(agriculturalArea, vegetationArea, total)
        }).toThrow();
    });

    test('Should throw an error when sum areas is greater than the total area', () => {
        const agriculturalArea = 20;
        const vegetationArea = 10;
        const total = 20;

        expect(() => {
            TotalArea.create(agriculturalArea, vegetationArea, total)
        }).toThrow();
    });
});
