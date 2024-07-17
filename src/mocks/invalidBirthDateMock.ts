export const invalidBirthDateMock = {
    name: 'Victor valdes',
    birthDate: '3000-01-01',
    appointmentDay: new Date().toISOString().split('T')[0],
    completed: false,
    conclusion: 'Initial check-up',
};

export const invalidBirthDateMock2 = {
    name: 'Victor valdes',
    birthDate: '1900-01-01',
    appointmentDay: new Date().toISOString().split('T')[0],
    completed: false,
    conclusion: 'Initial check-up',
};
