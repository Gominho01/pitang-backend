const appointments = [];
const MAX_APPOINTMENTS_PER_HOUR = 2;
const MAX_APPOINTMENTS_PER_DAY = 20;

const getAll = (req, res) => {
  res.json(appointments);
};

const createAppointment = (req, res) => {
	const { name, birthDate, appointmentDay } = req.body;

  if (!name || !birthDate || !appointmentDay) {
    return res.status(400).json({ error: 'Nome, data de nascimento e horario do agendamento são obrigatorios' });
  }

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
    app => app.appointmentDate === appointmentDate
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

  if (!name || !birthDate || !appointmentDate) {
    return res.status(400).json({ error: 'Name, birthDate, and appointmentDate are required' });
  }
  const newAppointment = {
    id: Date.now().toString(),
    name,
    birthDate,
    appointmentDate
  };

  appointments.push(newAppointment);
			res.status(201).json(newAppointment);
};

const updateStatus = (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;

  const appointment = appointments.find(app => app.id === id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  appointment.completed = completed;
  res.json(appointment);
};