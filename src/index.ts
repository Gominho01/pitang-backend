import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import appointmentRoutes from './routes/router';

const app = express();

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api', appointmentRoutes);

export default app;
