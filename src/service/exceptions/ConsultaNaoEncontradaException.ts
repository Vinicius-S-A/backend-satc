// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Consulta buscada por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas com {id} e rotas que referenciam Consulta pelo id.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class ConsultaNaoEncontradaException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Consulta ${id} não encontrada`);
  }
}
