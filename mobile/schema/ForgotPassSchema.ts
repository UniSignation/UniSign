import { z } from "zod";

export const ForgotPassSchema = z.object({
    email: z.string().email({message: "Please provide a valid email"}),
});

export type ForgotPassInfo = z.infer<typeof ForgotPassSchema>;