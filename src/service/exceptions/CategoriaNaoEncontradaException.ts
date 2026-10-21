// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Categoria buscada por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: GET /categorias/:id.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class CategoriaNaoEncontradaException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Categoria ${id} não encontrada`);
  }
}
