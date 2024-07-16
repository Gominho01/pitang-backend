const appointmentDay = new Date().toISOString().split('T')[0];

export const repeatedAppointmentMock1 = {
    name: 'Bob Johnson',
    birthDate: '1985-05-15',
    appointmentDay,
    completed: false,
    conclusion: 'Initial check-up',
};

export const repeatedAppointmentMock2 = {
    name: 'Chris Evans',
    birthDate: '1980-07-20',
    appointmentDay,
    completed: false,
    conclusion: 'Initial check-up',
};

export const repeatedAppointmentMock3 = {
    name: 'Diana Prince',
    birthDate: '1975-12-25',
    appointmentDay,
    completed: false,
    conclusion: 'Initial check-up',
};

