interface Appointment {
    id: string;
    name: string;
    birthDate: string;
    appointmentDate: Date;
    completed: boolean;
    conclusion?: string;
  }

let appointments: Appointment[] = [];
const MAX_APPOINTMENTS_PER_SLOT = 2;
const MAX_APPOINTMENTS_PER_DAY = 20;

export const getAllAppointments = () => appointments;

export const createAppointment = (newAppointment: Appointment) => {
  const { appointmentDate } = newAppointment;

  const appointmentsOnSameDay = appointments.filter(
    app => new Date(app.appointmentDate).toDateString() === appointmentDate.toDateString()
  );

  if (appointmentsOnSameDay.length >= MAX_APPOINTMENTS_PER_DAY) {
    throw new Error('Número máximo de agendamentos para este dia atingido');
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