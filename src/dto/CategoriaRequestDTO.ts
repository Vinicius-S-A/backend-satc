// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /categorias, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /categorias.
// SITUAÇÃO: implementada.
import { z } from "zod";

export const CategoriaRequestSchema = z.object({
  nome: z.string({ required_error: "nome é obrigatório" }).trim().min(1, "nome é obrigatório").max(100, "nome deve ter até 100 caracteres")
});

export type CategoriaRequestDTO = z.infer<typeof CategoriaRequestSchema>;
