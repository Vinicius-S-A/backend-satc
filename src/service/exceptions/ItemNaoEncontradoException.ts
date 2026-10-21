// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Item buscado por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas de /itens com {id}.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class ItemNaoEncontradoException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Item ${id} não encontrado`);
  }
}
