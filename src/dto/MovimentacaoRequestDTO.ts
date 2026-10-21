// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /movimentacoes, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /movimentacoes (ainda não implementada).
// SITUAÇÃO: completa (contrato), rota montada.
import { z } from "zod";

export const MovimentacaoRequestSchema = z.object({
  itemId: z.number({ required_error: "itemId é obrigatório" }).int().positive(),
  tipo: z.enum(["ENTRADA", "SAIDA"], { errorMap: () => ({ message: "tipo deve ser ENTRADA ou SAIDA" }) }),
  quantidade: z.number({ required_error: "quantidade é obrigatória" }).int().positive("quantidade deve ser maior que zero")
});

export type MovimentacaoRequestDTO = z.infer<typeof MovimentacaoRequestSchema>;
