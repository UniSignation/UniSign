import { z } from "zod";

 export const EditProfileSchema = z.object({
    firstName: z.string().min(2, { message:'First name must contain at least 2 letters' }).regex(/^[a-zA-Z]+$/, { message: 'A name can only contain letters' }),
    lastName: z.string().min(2, { message:'Last name must contain at least 2 letters' }).regex(/^[a-zA-Z]+$/, { message: 'A name can only contain letters' }),
    // newEmail: z.string().email({message: "Please provide a valid email"}),
})

export type EditProfileInfo = z.infer<typeof EditProfileSchema>;