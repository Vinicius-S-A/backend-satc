// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Profissional buscado por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas com {id} e rotas que referenciam Profissional pelo id.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class ProfissionalNaoEncontradoException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Profissional ${id} não encontrado`);
  }
}
