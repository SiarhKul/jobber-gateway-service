import { Application } from 'express';
import { healthRoutes } from './routes/health';
import { authRoutes } from './routes/auth/auth';

const BASE_PATH = '/api/gateway/v1';

export const appRouts = (app: Application) => {
  app.use('', healthRoutes.routes());
  app.use(BASE_PATH, authRoutes.routes());
};
