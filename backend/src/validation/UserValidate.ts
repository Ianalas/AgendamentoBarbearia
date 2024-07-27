import { cpf } from "cpf-cnpj-validator";
import { FastifyRequest } from "fastify";
import { db } from "../database/prisma";
import { createUserSchema } from "../schemas/user-schema";

export class UserValidate {
  async validateSchema(req: FastifyRequest) {
    const data = createUserSchema.parse(req.body);

    if (!cpf.isValid(data.cpf)) throw new Error("CPF inválido.");

    if (data.phoneNumber.length != 11) {
      throw new Error("Numero de telefone é inválido !");
    }

    const emailAlreadyExists = await db.user.findUnique({
      where: {
        email: data.email,
      },
    });

    const cpfAlreadyExists = await db.user.findUnique({
      where: {
        cpf: data.cpf,
      },
    });

    if (emailAlreadyExists || cpfAlreadyExists) {
      throw new Error("Alguns dos dados já foram utilizados.");
    }

    return data;
  }
}
