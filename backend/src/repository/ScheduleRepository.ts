import { Schedule } from "@prisma/client";
import { db } from "../database/prisma";
import { IScheduleData } from "../schemas/schedule-schema";

export class ScheduleRepository {
  async save(data: IScheduleData): Promise<{ id: string }> {
    return db.schedule.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async findScheduleByDatetime(datetime: string): Promise<Schedule[] | null> {
    return db.schedule.findMany({
      where: {
        datetime,
      },
    });
  }
}
