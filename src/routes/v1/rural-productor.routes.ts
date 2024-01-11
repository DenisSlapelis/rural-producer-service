import { createRuralProductorController, deleteRuralProductorController, getRuralProductorByIdController } from '@utils/dependency.utils';
import { Router } from 'express';

export const ruralProductorRoutes = Router();

// ** POST **
ruralProductorRoutes.post('/', createRuralProductorController.handle);

// // ** GET **
// ruralProductorRoutes.get('/', controller.list);
ruralProductorRoutes.get('/:id', getRuralProductorByIdController.handle);

// // ** PUT **
// ruralProductorRoutes.put('/:id', controller.update);

// // ** DELETE **
ruralProductorRoutes.delete('/:id', deleteRuralProductorController.handle);
