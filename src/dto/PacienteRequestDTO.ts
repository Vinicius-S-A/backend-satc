
 // CAMADA: DTO
 // RESPONSABILIDADE: JSON de entrada do cadastro de pacientes, com validações usando Zod.
 // REGRAS: valida os campos recebidos; regras de negócio ficam no Service.
 // ROTAS ATENDIDAS: POST /pacientes.
 // SITUAÇÃO: implementada.

import { z } from "zod";

export const PacienteRequestSchema = z.object({
  nome: z.string({ required_error: "nome é obrigatório" })
    .trim()
    .min(1, "nome é obrigatório")
    .max(100, "nome deve ter até 100 caracteres"),

  cpf: z.string({ required_error: "cpf é obrigatório" })
    .trim()
    .min(1, "cpf é obrigatório")
    .max(14, "cpf deve ter até 14 caracteres"),

  telefone: z.string()
    .trim()
    .max(20, "telefone deve ter até 20 caracteres")
    .nullable()
    .optional(),

  email: z.string()
    .trim()
    .max(100, "email deve ter até 100 caracteres")
    .nullable()
    .optional()
});

export type PacienteRequestDTO = z.infer<typeof PacienteRequestSchema>;
