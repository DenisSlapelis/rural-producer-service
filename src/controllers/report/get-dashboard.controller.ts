import { GetDashboardUseCase } from '@useCases/reports/get-dashboard.use-case';
import { STATUS_CODE, STATUS_CODE_CAUSE } from '@utils/constants.utils';
import { Request, Response } from 'express';
import * as logger from '@logger';

export class GetDashboardController {
    constructor(private useCase: GetDashboardUseCase) { }

    handle = async (req: Request, res: Response) => {
        try {
            const result = await this.useCase.getReport();

            return res.status(STATUS_CODE.CREATED).json(result);
        } catch (error: any) {
            logger.error(error, {
                origin: 'GetDashboardController',
                stack: error.stack,
            });

            const statusCode = STATUS_CODE_CAUSE[error.cause] || STATUS_CODE.SERVER_ERROR;

            return res.status(statusCode).json({ message: error?.message || error });
        }
    }
}
