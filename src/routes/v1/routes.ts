import { configController } from '@utils/dependency.utils';
import { Router } from 'express';
import { ruralProductorRoutes } from './rural-productor.routes';

export const router = Router();

router.use('/configs', configController.getRouter());
router.use('/rural-productors', ruralProductorRoutes);
