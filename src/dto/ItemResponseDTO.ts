// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /itens.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas de /itens (ainda não implementadas).
// SITUAÇÃO: completa (contrato), rotas montadas.
export interface ItemResponseDTO {
  id: number;
  nome: string;
  quantidade: number;
  categoriaId: number;
}
