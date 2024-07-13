const appointments = [];
const MAX_APPOINTMENTS_PER_HOUR = 2;
const MAX_APPOINTMENTS_PER_DAY = 20;

const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().refine(date => {
    const parsedDate = new Date(date);
    const today = new Date();
    return !isNaN(parsedDate) && parsedDate <= today;
  }, {
    message: 'A data de nascimento deve ser anterior ou igual à data atual'
  }),
  appointmentDay: z.string().refine(date => {
    const parsedDate = new Date(date);
    const today = new Date();
    return !isNaN(parsedDate) && parsedDate >= today.setHours(0, 0, 0, 0);
  }, {
    message: 'Os agendamentos só podem ser feitos para hoje ou datas futuras'
  }),
  conclusion: z.string().optional(),
  completed: z.boolean().default(false)
});

const getAll = (req, res) => {
  res.json(appointments);
};

const createAppointment = async (req, res) => {
  try {
    const { name, birthDate, appointmentDay, completed, conclusion } = appointmentSchema.parse(req.body);
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
      app => new Date(app.appointmentDate).getTime() === appointmentDate.getTime()
    );

    if (appointmentsAtSameTime.length >= MAX_APPOINTMENTS_PER_SLOT) {
      return res.status(400).json({ error: 'Este horário já está totalmente ocupado' });
    }

    const appointmentsOnSameDay = appointments.filter(
      app => new Date(app.appointmentDate).toDateString() === appointmentDate.toDateString()
    );

    if (appointmentsOnSameDay.length >= MAX_APPOINTMENTS_PER_DAY) {
      return res.status(400).json({ error: 'Número máximo de agendamentos para este dia atingido' });
    }

    const newAppointmentId = Date.now().toString();
    const hashedId = await bcrypt.hash(newAppointmentId, 10);

    const newAppointment = {
      id: hashedId,
      name,
      birthDate,
      appointmentDate,
      completed: false
    };

    appointments.push(newAppointment);
    res.status(201).json(newAppointment);
  } catch (error) {
    return res.status(400).json({ error: error.errors[0].message });
  }
}

const updateStatus = (req, res) => {
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

export const getOne = (req, res) => {
  const { id } = req.params;

  const appointment = appointments.find(app => app.id === id)
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  res.json(appointment);
};


export const deleteAppointment = (req, res) => {
  const { id } = req.params;

  const appointment = appointments.filter(appointment => appointment.id !== id);
  if (!appointment) {
    return res.status(404).json({ error: 'Agendamento não encontrado' });
  }

  AppointmentService.deleteAppointment(id);
  res.json({ message: 'Agendamento deletado com sucesso' });
};

module.exports = {
  getAll,
  createAppointment,
  updateStatus,
	getOne,
	deleteAppointment
};