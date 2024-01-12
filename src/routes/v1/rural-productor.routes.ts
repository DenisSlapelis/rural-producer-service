import { Router } from 'express';
import { makeCreateRuralProductorController, makeDeleteRuralProductorController, makeGetRuralProductorByIdController } from 'src/factories/rural-productor.factory';

export const ruralProductorRoutes = Router();

// ** POST **
ruralProductorRoutes.post('/', makeCreateRuralProductorController().handle);

// // ** GET **
// ruralProductorRoutes.get('/', controller.list);
ruralProductorRoutes.get('/:id', makeGetRuralProductorByIdController().handle);

// // ** PUT **
// ruralProductorRoutes.put('/:id', controller.update);

// // ** DELETE **
ruralProductorRoutes.delete('/:id', makeDeleteRuralProductorController().handle);
