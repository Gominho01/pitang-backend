let appointments = [];

const getAll = (req, res) => {
  res.json(appointments);
};

const createAppointment = (req, res) => {
  const { name, birthDate, appointmentDate } = req.body;
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