import { cpf } from "cpf-cnpj-validator";
import { FastifyRequest } from "fastify";
import { createUserSchema } from "../schemas/user-schema";
import { UserRepository } from "../repository/UserRepository";

export class UserValidate {
  constructor(private readonly userRepository: UserRepository) {}

  async validateSchema(req: FastifyRequest) {
    const data = createUserSchema.parse(req.body);

    if (!cpf.isValid(data.cpf)) throw new Error("CPF inválido.");

    if (data.phoneNumber.length != 11) {
      // aconselho usar expressão regular
      throw new Error("Numero de telefone é inválido !");
    }

    const emailAlreadyExists = await this.userRepository.findUserByEmail(
      data.email
    );

    const cpfAlreadyExists = await this.userRepository.findUserByCPF(data.cpf);

    if (emailAlreadyExists || cpfAlreadyExists) {
      throw new Error("E-mail ou CPF já foram utilizados.");
    }

    return data;
  }
}
