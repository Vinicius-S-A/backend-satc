// CAMADA: DTO
// RESPONSABILIDADE: JSON de saída das rotas de /categorias.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: POST /categorias, GET /categorias, GET /categorias/:id.
// SITUAÇÃO: implementada.
export interface CategoriaResponseDTO {
  id: number;
  nome: string;
}
