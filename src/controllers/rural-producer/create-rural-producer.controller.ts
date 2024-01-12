import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import { CreateRuralProducerUseCase } from '@useCases/rural-producer/create-rural-producer.use-case';
import { injectable } from 'tsyringe';
import * as logger from '@logger';

@injectable()
export class CreateRuralProducerController {
    constructor(private useCase: CreateRuralProducerUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            const { document, name } = req.body;

            if (!document) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'document' was not found.` });
            if (!name) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'name' was not found.` });

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
}