// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /consultas, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /consultas.
// SITUAÇÃO: implementada.
import { z } from "zod";

export const ConsultaRequestSchema = z.object({
  pacienteId: z.number({ required_error: "pacienteId é obrigatório" }).int().positive("pacienteId deve ser positivo"),
  profissionalId: z.number({ required_error: "profissionalId é obrigatório" }).int().positive("profissionalId deve ser positivo"),
  dataHora: z
    .string({ required_error: "dataHora é obrigatória" })
    .datetime({ local: true, offset: true, message: "dataHora inválida (use AAAA-MM-DDTHH:mm:ss)" })
    .transform((v) => new Date(v)),
  duracaoMinutos: z
    .number({ required_error: "duracaoMinutos é obrigatória" })
    .int("duracaoMinutos deve ser inteiro")
    .min(5, "duracaoMinutos deve ser de no mínimo 5")
    .max(480, "duracaoMinutos deve ser de no máximo 480")
});

export type ConsultaRequestDTO = z.infer<typeof ConsultaRequestSchema>;
