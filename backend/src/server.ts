import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { healthRouter } from './routes/health.js';
import { contactRouter } from './routes/contact.js';
import { statsRouter } from './routes/stats.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api/health', healthRouter);
app.use('/api/contact', contactRouter);
app.use('/api/stats', statsRouter);

app.listen(PORT, () => {
  console.log(`⚡ [AYUSHMAN.OS BACKEND] Server running on http://localhost:${PORT}`);
});
