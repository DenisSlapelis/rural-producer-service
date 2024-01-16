import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';
import { UpdateRuralProducerUseCase } from '@useCases/rural-producer/update-rural-producer.use-case';

export class UpdateRuralProducerController {
    constructor(private useCase: UpdateRuralProducerUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'id' was not found.` });

            this.validRequiredBodyParams(req.body)

            const result = await this.useCase.update(Number(id), { ...req.body }, req['sysUserId']);

            return res.status(STATUS_CODE.OK).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'UpdateRuralProducerController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }

    private validRequiredBodyParams = (params) => {
        if (!params.document) throw new Error(`Required param 'document' was not found.`, { cause: 'Validation Error' });
        if (!params.name) throw new Error(`Required param 'name' was not found.`, { cause: 'Validation Error' });
    }
}
