// src/index.ts
import express from 'express';
import appointmentRoutes from './routes/router';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api', appointmentRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
