// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /itens, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /itens (ainda não implementada).
// SITUAÇÃO: completa (contrato), rota montada.
import { z } from "zod";

export const ItemRequestSchema = z.object({
  nome: z.string({ required_error: "nome é obrigatório" }).trim().min(1, "nome é obrigatório").max(100),
  quantidade: z.number({ required_error: "quantidade é obrigatória" }).int().min(0, "quantidade não pode ser negativa"),
  categoriaId: z.number({ required_error: "categoriaId é obrigatório" }).int().positive()
});

export type ItemRequestDTO = z.infer<typeof ItemRequestSchema>;
