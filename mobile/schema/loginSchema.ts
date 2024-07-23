import { z } from "zod";

 export const LoginSchema = z.object({
    email: z.string().email({message: "Please provide a valid email"}),
    password: z.string()
});

export type LoginInfo = z.infer<typeof LoginSchema>;
