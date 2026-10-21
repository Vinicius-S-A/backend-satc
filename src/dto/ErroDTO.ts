// CAMADA: DTO
// RESPONSABILIDADE: formato único de erro da API (400, 404, 500).
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: todas, em caso de erro.
// SITUAÇÃO: implementada.
export interface CampoErroDTO {
  campo: string;
  mensagem: string;
}

export interface ErroDTO {
  status: number;
  mensagem: string;
  campos?: CampoErroDTO[];
  timestamp: string;
}
