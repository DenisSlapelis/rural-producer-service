import { configController } from '@utils/dependency.utils';
import { Router } from 'express';

export const router = Router();

router.use('/configs', configController.getRouter());
