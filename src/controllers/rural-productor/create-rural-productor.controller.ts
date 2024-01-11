import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import { CreateRuralProductorUseCase } from '@useCases/rural-productor/create-rural-productor.use-case';
import { inject, injectable } from 'tsyringe';
import * as logger from '@logger';

@injectable()
export class CreateRuralProductorController {
    constructor(@inject('CreateRuralProductorUseCase') private userCase: CreateRuralProductorUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            const { document, name } = req.body;

            if (!document) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'document' was not found.` });
            if (!name) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'name' was not found.` });

            const result = await this.userCase.create({ ...req.body, createdBy: req['sysUserId'] });

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'CreateRuralProductorController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }
}
