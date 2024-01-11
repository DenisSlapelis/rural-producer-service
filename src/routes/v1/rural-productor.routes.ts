import { createRuralProductorController } from '@utils/dependency.utils';
import { Router } from 'express';

export const ruralProductorRoutes = Router();

// ** POST **
ruralProductorRoutes.post('/', createRuralProductorController.handle);

// // ** GET **
// ruralProductorRoutes.get('/', controller.list);
// ruralProductorRoutes.get('/:id', controller.getById);

// // ** PUT **
// ruralProductorRoutes.put('/:id', controller.update);

// // ** DELETE **
// ruralProductorRoutes.delete('/:id', controller.delete);
