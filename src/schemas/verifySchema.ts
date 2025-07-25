import {z} from 'zod';



export const verifySchema = z.object({
//   email: z.string().email(),
  code: z.string().min(6).max(6).length(6, 'Code must be exactly 6 characters long'),
});