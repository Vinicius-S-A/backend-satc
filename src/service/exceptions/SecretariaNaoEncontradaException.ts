// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Secretaria buscada por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas com {id} e rotas que referenciam Secretaria pelo id.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class SecretariaNaoEncontradaException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Secretaria ${id} não encontrada`);
  }
}
