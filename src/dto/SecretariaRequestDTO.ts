// CAMADA: DTO
// RESPONSABILIDADE: JSON de entrada de POST /secretarias, com as validações (Zod).
// REGRAS: nenhuma (só validação de campo).
// ROTAS ATENDIDAS: POST /secretarias.
// SITUAÇÃO: implementada.
import { z } from "zod";

export const SecretariaRequestSchema = z.object({
  nome: z.string({ required_error: "nome é obrigatório" }).trim().min(1, "nome é obrigatório").max(100, "nome deve ter até 100 caracteres"),
  cpf: z.string({ required_error: "cpf é obrigatório" }).trim().min(1, "cpf é obrigatório").max(14, "cpf deve ter até 14 caracteres"),
  telefone: z.string().trim().max(20, "telefone deve ter até 20 caracteres").nullable().optional(),
  email: z.string().trim().email("email inválido").max(100, "email deve ter até 100 caracteres").nullable().optional(),
  login: z.string({ required_error: "login é obrigatório" }).trim().min(3, "login deve ter ao menos 3 caracteres").max(50, "login deve ter até 50 caracteres"),
  senha: z.string({ required_error: "senha é obrigatória" }).min(6, "senha deve ter ao menos 6 caracteres").max(100, "senha deve ter até 100 caracteres")
});

export type SecretariaRequestDTO = z.infer<typeof SecretariaRequestSchema>;
