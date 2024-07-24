import { z } from "zod";

 export const ReportProblemSchema = z.object({
Subject: z.string().min(2,{ message:'Subject must contain at least 2 letters' })
})

export type ReportProblemInfo = z.infer<typeof ReportProblemSchema>;
