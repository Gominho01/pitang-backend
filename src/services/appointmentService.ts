import { Appointment } from '../interfaces/appointment.interface';
import { MAX_APPOINTMENTS_PER_DAY, MAX_APPOINTMENTS_PER_SLOT } from '../constants';

let appointments: Appointment[] = [];

export const getAllAppointments = () => appointments;

export const createAppointment = (newAppointment: Appointment) => {
  const { appointmentDate } = newAppointment;

  const appointmentsOnSameDay = appointments.filter(
    app => new Date(app.appointmentDate).toDateString() === appointmentDate.toDateString()
  );

  if (appointmentsOnSameDay.length >= MAX_APPOINTMENTS_PER_DAY) {
    throw new Error('Número máximo de agendamentos para este dia atingido');
  }

  const appointmentHour = appointmentDate.getHours();
  if (appointmentHour < 11 || appointmentHour > 20) {
    throw new Error('Os agendamentos só podem ser marcados entre 11h e 20h');
  }

  const appointmentsAtSameTime = appointments.filter(
    app => app.appointmentDate.getTime() === appointmentDate.getTime()
  );

  if (appointmentsAtSameTime.length >= MAX_APPOINTMENTS_PER_SLOT) {
    throw new Error('Este horário já está totalmente ocupado');
  }

  appointments.push(newAppointment);
};

export const findAppointmentById = (id: string) => appointments.find(app => app.id === id);

export const updateAppointment = (id: string, updatedAppointment: Partial<Appointment>) => {
  const appointmentIndex = appointments.findIndex(app => app.id === id);
  if (appointmentIndex !== -1) {
    appointments[appointmentIndex] = { ...appointments[appointmentIndex], ...updatedAppointment };
  }
};

export const deleteAppointment = (id: string) => {
  appointments = appointments.filter(appointment => appointment.id !== id);
};