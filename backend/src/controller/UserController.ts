import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database/prisma";

export class UserController {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserSchema = z.object({
        completyName: z.string(),
        cpf: z.string(),
        email: z.string().email(),
        password: z.string().min(6),
        phoneNumber: z.string(),
      });

      const data = createUserSchema.parse(req.body);

      const emailAlreadyExists = await db.user.findUnique({
        where: {
          email: data.email,
        },
      });

      if (emailAlreadyExists) {
        throw new Error("Este email já está sendo usado.");
      }

      const user = await db.user.create({
        data,
      });

      return reply.send(user);
    } catch (err: any) {
      return reply.status(400).send({
        error: err.message,
      });
    }
  }
}
