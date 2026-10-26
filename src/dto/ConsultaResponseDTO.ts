// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /consultas.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: POST /consultas, GET /consultas, GET /consultas/:id.
// SITUAÇÃO: implementada.
export interface ConsultaResponseDTO {
  id: number;
  pacienteId: number;
  profissionalId: number;
  dataHora: string;
  duracaoMinutos: number;
  status: string;
}
