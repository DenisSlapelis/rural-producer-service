import { Router } from 'express';
import { makeCreateRuralProducerController, makeDeleteRuralProducerController, makeGetRuralProducerByIdController, makeUpdateRuralProducerController } from '../../factories/rural-producer.factory';

export const ruralProducerRoutes = Router();

// ** POST **
ruralProducerRoutes.post('/', makeCreateRuralProducerController().handle);

// // ** GET **
// ruralProducerRoutes.get('/', controller.list);
ruralProducerRoutes.get('/:id', makeGetRuralProducerByIdController().handle);

// // ** PUT **
ruralProducerRoutes.put('/:id', makeUpdateRuralProducerController().handle);

// // ** DELETE **
ruralProducerRoutes.delete('/:id', makeDeleteRuralProducerController().handle);
