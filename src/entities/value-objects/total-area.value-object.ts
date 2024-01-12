export class TotalArea {
    private total: number;

    private constructor(total: number) {
        this.total = total;
    }

    static create(agriculturalArea: number, vegetationArea: number, total: number): TotalArea {
        this.validate(agriculturalArea, vegetationArea, total);

        return new TotalArea(total);
    }

    public get value(): number {
        return this.total;
    }

    static validate(agriculturalArea: number, vegetationArea: number, total: number) {
        if (agriculturalArea < 0) throw new Error(`Invalid Agricultural Area value (${agriculturalArea})`);
        if (vegetationArea < 0) throw new Error(`Invalid Vegetation Area value (${vegetationArea})`);
        if (total <= 0) throw new Error(`Invalid Total Area value (${total})`);

        const sum = agriculturalArea + vegetationArea;

        if (sum > total) throw new Error('The sum of agricultural area and vegetation area must not be greater than the total area of the farm');
    }
}
