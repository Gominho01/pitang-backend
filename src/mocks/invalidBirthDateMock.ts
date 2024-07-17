import { appointmentDate } from "../constants";

export const invalidBirthDateMock = {
    name: 'Victor valdes',
    birthDate: '3000-01-01',
    appointmentDay: appointmentDate,
    completed: false,
    conclusion: 'Initial check-up',
};

export const invalidBirthDateMock2 = {
    name: 'Victor valdes',
    birthDate: '1900-01-01',
    appointmentDay: appointmentDate,
    completed: false,
    conclusion: 'Initial check-up',
};
