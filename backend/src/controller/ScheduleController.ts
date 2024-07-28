import { FastifyReply, FastifyRequest } from "fastify";
import { ScheduleService } from "../service/ScheduleService";
import { ScheduleValidate } from "../validation/ScheduleValidate";

export class ScheduleController {
  constructor(
    private readonly scheduleService: ScheduleService,
    private readonly scheduleValidate: ScheduleValidate
  ) {}

  async createSchedule(req: FastifyRequest, reply: FastifyReply) {
    try {
      const dataValidated = await this.scheduleValidate.validateSchema(req);

      const idSchedule = await this.scheduleService.create(dataValidated);

      return reply.status(201).send(idSchedule);
    } catch (err: any) {
      return reply.status(400).send({
        error: err.message,
      });
    }
  }
}
