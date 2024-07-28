import { z } from "zod";

export const createScheduleSchema = z.object({
  datetime: z.string().datetime({ message: "Data inválida" }),
  userId: z.string().uuid(),
  serviceId: z.string().uuid(),
});

export type IScheduleData = z.infer<typeof createScheduleSchema>;
