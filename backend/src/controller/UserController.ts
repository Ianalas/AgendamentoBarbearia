import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database/prisma";

export class UserController {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const createUserSchema = z.object({
        completyName: z.string(),
        cpf: z.string().min(1, "CPF é obrigátorio !"),
        email: z.string().email("E-mail inválido"),
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
      if (err instanceof z.ZodError) {
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
}
