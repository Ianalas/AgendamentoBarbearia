import { FastifyRequest } from "fastify";
import { createScheduleSchema } from "../schemas/schedule-schema";
import { ScheduleRepository } from "../repository/ScheduleRepository";

import { isPast } from "date-fns";
import { z } from "zod";

export class ScheduleValidate {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async validateSchema(req: FastifyRequest) {
    const data = createScheduleSchema.parse(req.body);

    await this.checkScheduleAvailable(data.datetime);

    return data;
  }

  async validateScheduleParams(id: string) {
    const scheduleParams = z.object({
      id: z.string().uuid(),
    });

    const { success, data } = scheduleParams.safeParse({ id });

    if (!success) {
      throw new Error("UUID Inválido !");
    }

    return data.id;
  }

  private async checkScheduleAvailable(datetime: string) {
    if (isPast(datetime)) {
      throw new Error("Data já está no passado.");
    }

    const schedules = await this.scheduleRepository.findScheduleByDatetime(
      datetime
    );

    if (schedules?.length! > 0) {
      throw new Error("Este horário já está agendado");
    }

    return true;
  }
}
