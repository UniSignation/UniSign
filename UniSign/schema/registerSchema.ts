import { z } from "zod";

 export const RegisterSchema = z.object({
    firstName: z.string().min(2, { message:'First name must contain at least 2 letters' }).regex(/^[a-zA-Z]+$/, { message: 'A name can only contain letters' }),
    lastName: z.string().min(2, { message:'Last name must contain at least 2 letters' }).regex(/^[a-zA-Z]+$/, { message: 'A name can only contain letters' }),
    email: z.string().email({message: "Please provide a valid email"}),
    password: z.string().min(8, { message: 'The password must contain at least 8 characters' })
    .regex(/[A-Z]/, { message: 'The password must contain at least one capital letter' })
    .regex(/[a-z]/, { message: 'The password must contain at least one lowercase letter' })
    .regex(/[0-9]/, { message: 'The password must contain at least one number' }),
    confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});

export type RegisterInfo = z.infer<typeof RegisterSchema>;
