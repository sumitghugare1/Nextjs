import {z} from 'zod';

export const usernameValidation = z.string()
  .min(2, 'Username must be at least 2 characters long')
  .max(100, 'Username cannot exceed 100 characters')
  .regex(/^[a-zA-Z0-9_]+$/, 'Username must consist of letters, numbers, and underscores only');

export const SignupSchema = z.object({
    username: usernameValidation,
    email: z.string().email({message: 'Invalid email address'}).max(100,{message: 'Email cannot exceed 100 characters'}),
    password: z.string().min(6,{message: 'Password must be at least 6 characters long'}).max(100,{message: 'Password cannot exceed 100 characters'}),
    confirmPassword: z.string().min(6,{message: 'Confirm Password must be at least 6 characters long'}).max(100,{message: 'Confirm Password cannot exceed 100 characters'}),
    // Add any other fields you need for signup
});

  