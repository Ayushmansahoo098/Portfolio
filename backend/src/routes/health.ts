import { Router } from 'express';

export const healthRouter = Router();

healthRouter.get('/', (_req, res) => {
  res.json({
    status: 'online',
    system: 'Ayushman.OS Core Services',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});
