import { z } from "zod";

export const RoomPageSchema = z.object({
    roomId: z.string().min(6 ,{ message:'Room ID must contain at least 6 letters' }),
});

export type RoomPageInfo = z.infer<typeof RoomPageSchema>;