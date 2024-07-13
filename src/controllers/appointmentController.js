let appointments = [];

const getAll = (req, res) => {
  res.json(appointments);
};

const createAppointment = (req, res) => {
	const { name, date } = req.body;
	if (!name || !date) {
		return res.status(400).json({ error: 'Name and date are required' });
	}
	const newAppointment = {
			id: Date.now().toString(),
			name,
			date
	};
			appointments.push(newAppointment);
			res.status(201).json(newAppointment);
};