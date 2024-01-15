import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import { CreateRuralProducerUseCase } from '@useCases/rural-producer/create-rural-producer.use-case';
import { injectable } from 'tsyringe';
import * as logger from '@logger';
import { Crop } from '@entities/crop.entity';

@injectable()
export class CreateRuralProducerController {
    constructor(private useCase: CreateRuralProducerUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            this.validRequiredBodyParams(req.body)

            req.body.farm.crops = this.toCrop(req.body.farm.crops);

            const result = await this.useCase.create({ ...req.body, createdBy: req['sysUserId'] });

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'CreateRuralProducerController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }

    private validRequiredBodyParams = (params) => {
        if (!params.document) throw new Error(`Required param 'document' was not found.`, { cause: 'Validation Error' });
        if (!params.name) throw new Error(`Required param 'name' was not found.`, { cause: 'Validation Error' });
        if (!params.farm?.name) throw new Error(`Required param 'name' was not found.`, { cause: 'Validation Error' });
        if (!params.farm?.city) throw new Error(`Required param 'city' was not found.`, { cause: 'Validation Error' });
        if (!params.farm?.state) throw new Error(`Required param 'state' was not found.`, { cause: 'Validation Error' });
        if (!params.farm?.agriculturalArea) throw new Error(`Required param 'agriculturalArea' was not found.`, { cause: 'Validation Error' });
        if (params.farm?.agriculturalArea < 0) throw new Error(`Invalid value for 'agriculturalArea' (${params.farm?.agriculturalArea})`, { cause: 'Validation Error' });
        if (!params.farm?.vegetationArea) throw new Error(`Required param 'vegetationArea' was not found.`, { cause: 'Validation Error' });
        if (params.farm?.vegetationArea < 0) throw new Error(`Invalid value for 'vegetationArea' (${params.farm?.vegetationArea})`, { cause: 'Validation Error' });
        if (!params.farm?.totalArea) throw new Error(`Required param 'totalArea' was not found.`, { cause: 'Validation Error' });
        if (params.farm?.totalArea < 0) throw new Error(`Invalid value for 'totalArea' (${params.farm?.totalArea})`, { cause: 'Validation Error' });
    }

    private toCrop(cropNames: string[]) {
        return cropNames.map(crop => new Crop(crop));
    }
}
