import express, { Request, Response, Router } from 'express';
import { HealthCheckService } from '@services/healthcheck.service';
import {  inject, injectable } from 'tsyringe';

@injectable()
export class HealthCheckController {
    private router: Router;

    constructor(
        @inject('HealthCheckService') private service: HealthCheckService) {
        this.router = express.Router();
        this.initializeRoutes();
    }

    private initializeRoutes = () => {
        // ** POST **

        // ** GET **
        this.router.get('/', this.checkHealth);

        // ** PATCH **
        // ** PUT **
        // ** DELETE **
    }

    public getRouter = (): Router => {
        return this.router;
    }

    private checkHealth = async (req: Request, res: Response) => {
        try {
            const result = await this.service.check();

            return res.status(200).json(result);
        } catch (error: any) {
            return res.status(500).json({ message: error?.message || error });
        }
    }
}
