import {z} from 'zod';

export const acceptMessageSchema = z.object({
//   id: z.string().uuid(),
  acceptMessages: z.boolean(),
});
