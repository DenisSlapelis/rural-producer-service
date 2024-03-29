import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';
import { DeleteRuralProducerUseCase } from '@useCases/rural-producer/delete-rural-producer.use-case';

export class DeleteRuralProducerController {
    constructor(private useCase: DeleteRuralProducerUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'id' was not found.` });

            await this.useCase.delete(Number(id), req['sysUserId']);

            return res.status(STATUS_CODE.NO_CONTENT).json();
        } catch (error: any) {
            logger.error(error, {
                origin: 'DeleteRuralProducerController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }
}
