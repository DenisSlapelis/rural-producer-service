import { healthCheckController } from '../utils/dependency.utils';
import { Router } from 'express';
import { router as routesV1 } from './v1/routes'

export const router = Router();

// health check
router.use('/healthcheck', healthCheckController.getRouter());

// v1 routes
router.use('/api/v1', routesV1);
