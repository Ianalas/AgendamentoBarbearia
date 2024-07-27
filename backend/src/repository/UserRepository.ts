import { db } from "../database/prisma";
import { User } from "@prisma/client";
import { IUserData } from "../schemas/user-schema";

export class UserRepository {
  async create(data: IUserData): Promise<{ id: string }> {
    return db.user.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return db.user.findUnique({
      where: {
        email,
      },
    });
  }
}
