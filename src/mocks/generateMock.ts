const generateAppointmentMocks = (day: string, startHour: number, total: number) => {
  const mocks = [];
  for (let i = 0; i < total; i++) {
    mocks.push({
      name: `User ${i + 1}`,
      birthDate: `1990-01-${String(i + 1).padStart(2, '0')}`,
      appointmentDay: day,
      appointmentTime: `${String(startHour + i % 10).padStart(2, '0')}:00`,
    });
  }
  return mocks;
};

export const generateMocks = generateAppointmentMocks('2025-07-19', 14, 23);
