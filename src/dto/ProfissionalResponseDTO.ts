// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /profissionais.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: POST /profissionais, GET /profissionais, GET /profissionais/:id.
// SITUAÇÃO: implementada.
export interface ProfissionalResponseDTO {
  id: number;
  nome: string;
  especialidade: string;
  telefone: string | null;
  email: string | null;
  horaInicio: string;
  horaFim: string;
  diasAtendimento: number[];
}
