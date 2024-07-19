import { z } from 'zod';
import { maxAge } from '../constants';

export const appointmentSchema = z.object({
  name: z.string().min(1, 'Nome é obrigatório'),
  birthDate: z.string().refine(date => {
    const parsedDate = new Date(date);
    const today = new Date();
    const earliestValidDate = new Date(today.getFullYear() - maxAge, today.getMonth(), today.getDate());
    return !isNaN(parsedDate.getTime()) && parsedDate <= today && parsedDate >= earliestValidDate;
  }, {
    message: 'A data de nascimento deve ser anterior ou igual à data atual e não pode ser maior que 120 anos'
  }),
  appointmentDay: z.string().refine(date => {
    const parsedDate = new Date(date);
    const today = new Date();
    return !isNaN(parsedDate.getTime()) && parsedDate >= new Date(today.setHours(0, 0, 0, 0));
  }, {
    message: 'Os agendamentos só podem ser feitos para hoje ou datas futuras'
  }),
  conclusion: z.string().optional(),
  completed: z.boolean().default(false),
});