import { z } from "zod";

export const ResetPassSchema = z.object({
    code: z.string().min(6,{ message:'The code must contain at least 6 characters' }),
    password: z.string().min(8, { message: 'The password must contain at least 8 characters' })
    .regex(/[A-Z]/, { message: 'The password must contain at least one capital letter' })
    .regex(/[a-z]/, { message: 'The password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'The password must contain at least one number' }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type ResetPassInfo = z.infer<typeof ResetPassSchema>;