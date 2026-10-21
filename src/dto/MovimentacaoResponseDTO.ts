// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /movimentacoes.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas de /movimentacoes (ainda não implementadas).
// SITUAÇÃO: completa (contrato), rotas montadas.
export interface MovimentacaoResponseDTO {
  id: number;
  itemId: number;
  tipo: string;
  quantidade: number;
  dataHora: string;
}
