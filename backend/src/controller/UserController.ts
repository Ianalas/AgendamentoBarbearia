import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { UserService } from "../service/UserService";
import { UserValidate } from "../validation/UserValidate";

export class UserController {
  private userService: UserService;
  private userValidate: UserValidate;

  constructor(service: UserService, userValidate: UserValidate) {
    this.userService = service;
    this.userValidate = userValidate;
  }

  async createUser(req: FastifyRequest, reply: FastifyReply) {
    try {
      const validatedData = await this.userValidate.validateSchema(req);
      const user = await this.userService.createUser(validatedData);

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
