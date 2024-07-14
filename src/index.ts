import express from 'express';
import cors from 'cors';
import helmet from 'helmet'
import appointmentRoutes from './routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(helmet());

app.use('/api', appointmentRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});