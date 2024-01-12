import { configController } from '@utils/dependency.utils';
import { Router } from 'express';
import { ruralProducerRoutes } from './rural-producer.routes';

export const router = Router();

router.use('/configs', configController.getRouter());
router.use('/rural-producers', ruralProducerRoutes);
