
 // CAMADA: DTO
 // RESPONSABILIDADE: JSON de saída das rotas de pacientes.
 // REGRAS: nenhuma; define o formato dos dados devolvidos.
 // ROTAS ATENDIDAS: POST /pacientes, GET /pacientes, GET /pacientes/:id.
 // SITUAÇÃO: implementada.

export interface PacienteResponseDTO {
  id: number;
  nome: string;
  cpf: string;
  telefone: string | null;
  email: string | null;
}
