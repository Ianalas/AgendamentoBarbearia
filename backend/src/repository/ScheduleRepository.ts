import { Prisma, Schedule } from "@prisma/client";
import { db } from "../database/prisma";
import { IScheduleData } from "../schemas/schedule-schema";

export type ScheduleWithUser = Prisma.ScheduleGetPayload<{
  select: {
    id: true;
    datetime: true;
    user: {
      select: {
        completyName: true;
      };
    };
  };
}>;

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

  async findScheduleById(id: string): Promise<ScheduleWithUser | null> {
    return db.schedule.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        datetime: true,
        user: {
          select: {
            completyName: true,
          },
        },
      },
    });
  }
}
