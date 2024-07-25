import { FastifyRequest } from "fastify";
import { z } from "zod";

export class UserValidate {
  validateSchema(req: FastifyRequest) {
    const createUserSchema = z.object({
      completyName: z.string(),
      cpf: z.string().min(1, "CPF é obrigátorio !"),
      email: z.string().email("E-mail inválido"),
      password: z.string().min(6),
      phoneNumber: z.string(),
    });

    const data = createUserSchema.safeParse(req.body);

    if (!data.success) {
      throw new Error("Erro na validação");
    }

    return data;
  }
}
