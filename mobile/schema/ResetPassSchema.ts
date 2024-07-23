import { z } from "zod";

export const ResetPassSchema = z.object({
    code: z.string(),
    password: z.string(),
    confirmPassword: z.string()
});

export type ResetPassInfo = z.infer<typeof ResetPassSchema>;