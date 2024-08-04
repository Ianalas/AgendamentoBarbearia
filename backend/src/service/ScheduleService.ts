import { string, z } from "zod";
import {
  ScheduleRepository,
  ScheduleWithUser,
} from "../repository/ScheduleRepository";
import { IScheduleData } from "../schemas/schedule-schema";

export class ScheduleService {
  constructor(private readonly scheduleRepository: ScheduleRepository) {}

  async create(data: IScheduleData): Promise<{ id: string }> {
    return this.scheduleRepository.save(data);
  }

  async fetchScheduleById(id: string): Promise<ScheduleWithUser | null> {
    return this.scheduleRepository.findScheduleById(id);
  }
}
