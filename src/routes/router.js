const express = require('express');
const { getAll, createAppointment, deleteAppointment, getOne, updateStatus} = require('../controllers/appointmentController');

const router = express.Router();

router.get('/appointments', getAll);
router.get('/appointments/:id', getOne);
router.delete('/appointments/:id', deleteAppointment);
router.patch('/appointments/:id', updateStatus);
router.post('/appointments', createAppointment);

module.exports = router;