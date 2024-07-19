const generateAppointmentMocks = (startDay: string, startHour: number, total: number) => {
  const mocks = [];
  let currentHour = startHour;

  for (let i = 0; i < total; i++) {
    const date = `${startDay}T${String(currentHour).padStart(2, '0')}:00:00.000Z`;

    mocks.push({
      name: `User ${i + 1}`,
      birthDate: `1990-01-27`,
      appointmentDay: date,
    });

    currentHour++;
    if (currentHour > 22) {
      currentHour = 12;
    }
  }
  return mocks;
};

export const generateMocks = generateAppointmentMocks('2025-07-19', 12, 20);