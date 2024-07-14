import express from 'express';
import { getAll, createAppointment, deleteAppointment, getOne, updateStatus} from '../controllers/appointmentController';

const router = express.Router();

router.get('/appointments', getAll);
router.get('/appointments/:id', getOne);
router.delete('/appointments/:id', deleteAppointment);
router.patch('/appointments/:id', updateStatus);
router.post('/appointments', createAppointment);

export default router;