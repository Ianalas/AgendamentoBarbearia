import { FastifyReply, FastifyRequest } from "fastify";
import { ScheduleService } from "../service/ScheduleService";
import { ScheduleValidate } from "../validation/ScheduleValidate";
import { ZodError } from "zod";

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
      if (err instanceof ZodError) {
        err.errors.map((err) => {
          return reply.status(400).send({
            error: err.message,
          });
        });
      }

      return reply.status(400).send({
        error: err.message,
      });
    }
  }

  async getScheduleById(req: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = req.params as { id: string };

      const idValidated = await this.scheduleValidate.validateScheduleParams(
        id
      );

      const schedule = await this.scheduleService.fetchScheduleById(
        idValidated
      );

      if (!schedule) {
        throw new Error("Agendamento não encontrado !");
      }

      const scheduleDateFormated = {
        ...schedule,
        datetime: Intl.DateTimeFormat("pt-BR", {
          dateStyle: "short",
          timeStyle: "short",
        }).format(schedule.datetime),
      };

      return reply.status(200).send(scheduleDateFormated);
    } catch (error) {
      if (error instanceof Error) {
        reply.status(400).send({
          error: error.message,
        });
      }
    }
  }
}
