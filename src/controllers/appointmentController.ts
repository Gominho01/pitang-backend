import { Request, Response } from 'express';
import { appointmentSchema } from '../schemas/appointment.schema';

interface Appointment {
  id: string;
  name: string;
  birthDate: string;
  appointmentDate: Date;
  completed: boolean;
  conclusion?: string;
}

let appointments: Appointment[] = [];
const MAX_APPOINTMENTS_PER_HOUR = 2;
const MAX_APPOINTMENTS_PER_DAY = 20;


export const getAll = (req: Request, res: Response) => {
  res.json(appointments);
};

export const createAppointment = async (req: Request, res: Response) => {
  try {
    const { name, birthDate, appointmentDay} = appointmentSchema.parse(req.body);
    const appointmentDate = new Date(appointmentDay);

    const invalidHour = (
      appointmentDate.getMinutes() !== 0 ||
      appointmentDate.getSeconds() !== 0 ||
      appointmentDate.getMilliseconds() !== 0
    );

    if (invalidHour) {
      return res.status(400).json({ error: 'Os agendamentos só podem ser feitos em horários exatos (ex: 11:00, 12:00)' });
    }

    const appointmentsAtSameTime = appointments.filter(
      app => app.appointmentDate.getTime() === appointmentDate.getTime()
    );

    if (appointmentsAtSameTime.length >= MAX_APPOINTMENTS_PER_HOUR) {
      return res.status(400).json({ error: 'Este horário já está totalmente ocupado' });
    }

    const appointmentsOnSameDay = appointments.filter(
      app => new Date(app.appointmentDate).toDateString() === appointmentDate.toDateString()
    );

    if (appointmentsOnSameDay.length >= MAX_APPOINTMENTS_PER_DAY) {
      return res.status(400).json({ error: 'Número máximo de agendamentos para este dia atingido' });
    }

    const newAppointmentId = Date.now().toString();

    const newAppointment: Appointment = {
      id: newAppointmentId,
      name,
      birthDate,
      appointmentDate,
      completed: false
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error: any) {
    if (error.errors && error.errors.length > 0) {
      return res.status(400).json({ error: error.errors[0].message });
    } else {
      return res.status(400).json({ error: 'Erro ao processar o agendamento' });
    }
  }
};

export const updateStatus = (req: Request, res: Response) => {
  const { id } = req.params;
  const { completed, conclusion } = req.body;

  const appointment = appointments.find(app => app.id === id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  appointment.completed = completed;
	appointment.conclusion = conclusion || appointment.conclusion;
  res.json(appointment);
};


export const getOne = (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = appointments.find(app => app.id === id)
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  res.json(appointment);
};


export const deleteAppointment = (req: Request, res: Response) => {
  const { id } = req.params;

  const appointment = appointments.find(app => app.id === id)
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  appointments = appointments.filter(appointment => appointment.id !== id);
  res.json({ message: 'Agendamento deletado com sucesso' });
};

module.exports = {
  getAll,
  createAppointment,
  updateStatus,
	getOne,
	deleteAppointment
};