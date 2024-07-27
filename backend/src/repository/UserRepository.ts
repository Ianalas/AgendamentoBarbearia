import { z } from "zod";
import { db } from "../database/prisma";
import { User } from "@prisma/client";

const createUserSchema = z.object({
  completyName: z.string(),
  cpf: z.string().min(1, "CPF é obrigátorio !"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6),
  phoneNumber: z.string(),
});

export type UserData = z.infer<typeof createUserSchema>;

export class UserRepository {
  async create(data: UserData) {
    return await db.user.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async findUserByEmail(email: string): Promise<User | null> {
    return await db.user.findUnique({
      where: {
        email,
      },
    });
  }
}
