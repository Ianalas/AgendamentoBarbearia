import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { db } from "../database/prisma";

import { UserValidate } from "../validation/UserValidate";

import { hash } from "bcrypt";

export class UserController {
  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const userValidate = new UserValidate();

      const data = await userValidate.validateSchema(req);

      const hashedPassword = await hash(data.password, 8);

      const user = await db.user.create({
        data: {
          ...data,
          password: hashedPassword,
        },
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
