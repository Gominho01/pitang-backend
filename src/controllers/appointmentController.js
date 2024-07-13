const appointments = [];
const MAX_APPOINTMENTS_PER_HOUR = 2;

const getAll = (req, res) => {
  res.json(appointments);
};

const createAppointment = (req, res) => {
  const { name, birthDate, appointmentDate } = req.body;

  const appointmentsAtSameTime = appointments.filter(
    app => app.appointmentDate === appointmentDate
  );

  if (appointmentsAtSameTime.length >= MAX_APPOINTMENTS_PER_HOUR) {
    return res.status(400).json({ error: 'Este horário já está totalmente ocupado' });
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