import { FastifyInstance } from "fastify";
import { ScheduleController } from "../controller/ScheduleController";
import { ScheduleService } from "../service/ScheduleService";
import { ScheduleRepository } from "../repository/ScheduleRepository";
import { ScheduleValidate } from "../validation/ScheduleValidate";

export async function scheduleRoutes(server: FastifyInstance) {
  const scheduleRepository = new ScheduleRepository();
  const scheduleService = new ScheduleService(scheduleRepository);

  const scheduleValidate = new ScheduleValidate(scheduleRepository);
  const scheduleController = new ScheduleController(
    scheduleService,
    scheduleValidate
  );

  server.post(
    "/schedule",
    scheduleController.createSchedule.bind(scheduleController)
  );

  server.get(
    "/schedule/:id",
    scheduleController.getScheduleById.bind(scheduleController)
  );
}
