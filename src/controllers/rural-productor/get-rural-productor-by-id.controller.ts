import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import { inject, injectable } from 'tsyringe';
import * as logger from '@logger';
import { GetRuralProductorByIdUseCase } from '@useCases/rural-productor/get-rural-productor-by-id.use-case';

@injectable()
export class GetRuralProductorByIdController {
    constructor(@inject('GetRuralProductorByIdUseCase') private userCase: GetRuralProductorByIdUseCase) {
    }

    handle = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;

            if (!id) return res.status(STATUS_CODE.VALIDATION_ERROR).json({ message: `Required param 'id' was not found.` });

            const result = await this.userCase.getById(Number(id));

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'GetRuralProductorByIdController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }
}
