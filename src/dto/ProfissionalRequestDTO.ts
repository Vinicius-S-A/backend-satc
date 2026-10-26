// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /profissionais, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /profissionais.
// SITUAÇÃO: implementada.
import { z } from "zod";

const HORA = /^([01]\d|2[0-3]):[0-5]\d$/;

export const ProfissionalRequestSchema = z
  .object({
    nome: z.string({ required_error: "nome é obrigatório" }).trim().min(1, "nome é obrigatório").max(100, "nome deve ter até 100 caracteres"),
    especialidade: z.string({ required_error: "especialidade é obrigatória" }).trim().min(1, "especialidade é obrigatória").max(100, "especialidade deve ter até 100 caracteres"),
    telefone: z.string().trim().max(20, "telefone deve ter até 20 caracteres").nullable().optional(),
    email: z.string().trim().email("email inválido").max(100, "email deve ter até 100 caracteres").nullable().optional(),
    horaInicio: z.string({ required_error: "horaInicio é obrigatória" }).regex(HORA, "horaInicio deve estar no formato HH:mm"),
    horaFim: z.string({ required_error: "horaFim é obrigatória" }).regex(HORA, "horaFim deve estar no formato HH:mm"),
    diasAtendimento: z
      .array(z.number().int().min(0, "dia deve ser de 0 (domingo) a 6 (sábado)").max(6, "dia deve ser de 0 (domingo) a 6 (sábado)"), {
        required_error: "diasAtendimento é obrigatório"
      })
      .min(1, "informe ao menos um dia de atendimento")
  })
  .refine((d) => d.horaInicio < d.horaFim, { message: "horaFim deve ser maior que horaInicio", path: ["horaFim"] });

export type ProfissionalRequestDTO = z.infer<typeof ProfissionalRequestSchema>;
