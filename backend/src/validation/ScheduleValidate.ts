import { FastifyRequest } from "fastify";
import { createScheduleSchema } from "../schemas/schedule-schema";
import { ScheduleRepository } from "../repository/ScheduleRepository";

export class ScheduleValidate {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async validateSchema(req: FastifyRequest) {
    const data = createScheduleSchema.parse(req.body);

    await this.checkScheduleAvailable(data.datetime);

    return data;
  }

  private async checkScheduleAvailable(datetime: string) {
    const schedules = await this.scheduleRepository.findScheduleByDatetime(
      datetime
    );

    if (schedules?.length! > 0) {
      throw new Error("Este horário já está agendado");
    }

    return true;
  }
}
