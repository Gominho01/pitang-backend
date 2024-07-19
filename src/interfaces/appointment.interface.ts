export interface Appointment {
    id: string;
    name: string;
    birthDate: string;
    appointmentDate: Date;
    completed: boolean;
    conclusion?: string;
  }
