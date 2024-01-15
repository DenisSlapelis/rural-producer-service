import { firstCharacterUpperCase, replaceAccentedCharacters } from "@utils/string-functions.utils";

export class CropVO {
    private crop: string;
    private static readonly VALID_CROPS = ['SOJA', 'MILHO', 'ALGODAO', 'CAFE', 'CANA DE ACUCAR'];

    private constructor(crop: string) {
        this.crop = crop;
    }

    static create(value: string): CropVO {
        this.validate(value);

        return new CropVO(firstCharacterUpperCase(value));
    }

    public get value(): string {
        return this.crop;
    }

    static validate(value: string) {
        const formattedValue = replaceAccentedCharacters(value).toUpperCase();

        if (!CropVO.VALID_CROPS.includes(formattedValue)) throw new Error(`Invalid Crop: ${value}`, { cause: 'Validation Error' });
    }
}
