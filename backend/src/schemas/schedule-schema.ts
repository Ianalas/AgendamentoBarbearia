import { z } from "zod";

export const createScheduleSchema = z.object({
  userId: z.string().uuid({ message: "UUID inválido !" }),
  datetime: z.string().datetime({ message: "Formato da data inválido !" }),
  serviceId: z.string().uuid().min(1, "Id do serviço inválido !"),
});

export type IScheduleData = z.infer<typeof createScheduleSchema>;
