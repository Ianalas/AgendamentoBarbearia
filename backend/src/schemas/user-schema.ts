import { z } from "zod";

export const createUserSchema = z.object({
  completyName: z.string().min(1, "Nome completo é obrigátorio !"),
  cpf: z.string().min(1, "CPF é obrigátorio !"),
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve conter no minimo 6 digitos."),
  phoneNumber: z.string().min(1, "Numero de telefone é obrigátorio"),
});

export type IUserData = z.infer<typeof createUserSchema>;
