// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /secretarias. Nunca inclui a senha.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: POST /secretarias, GET /secretarias, GET /secretarias/:id.
// SITUAÇÃO: implementada.
export interface SecretariaResponseDTO {
  id: number;
  nome: string;
  cpf: string;
  telefone: string | null;
  email: string | null;
  login: string;
}
