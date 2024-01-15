import { Router } from 'express';
import { makeGetDashboardController } from 'src/factories/dashboard.factory';

export const reportRoutes = Router();

// // ** GET **
reportRoutes.get('/dashboard', makeGetDashboardController().handle);
