import { Request, Response } from 'express';
import { appointmentSchema } from '../schemas/appointment.schema';
import * as AppointmentService from '../services/appointmentService';

export const getAll = (req: Request, res: Response) => {
  const appointments = AppointmentService.getAllAppointments();
  res.json(appointments);
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, birthDate, appointmentDay, completed, conclusion } = appointmentSchema.parse(req.body);
    const newAppointment = {
      id: Date.now().toString(),
      name,
      birthDate,
      appointmentDate: new Date(appointmentDay),
      completed,
      conclusion,
    };
    AppointmentService.createAppointment(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error: any) {
    if (error.errors && error.errors.length > 0) {
      res.status(400).json({ error: error.errors[0].message });
    } else {
      res.status(400).json({ error: 'Erro ao processar o agendamento' });
    }
  }
};

export const updateStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, conclusion } = req.body;

  const appointment = AppointmentService.findAppointmentById(id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  AppointmentService.updateAppointment(id, { completed, conclusion });
  res.json({ ...appointment, completed, conclusion });
};

export const deleteAppointment = (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = AppointmentService.findAppointmentById(id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  AppointmentService.deleteAppointment(id);
  res.json({ message: 'Agendamento deletado com sucesso' });
};

export const getOne = (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = AppointmentService.findAppointmentById(id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  res.json(appointment);
};