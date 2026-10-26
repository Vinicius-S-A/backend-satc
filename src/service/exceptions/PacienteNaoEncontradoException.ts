// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: Paciente buscado por id que não existe. Vira 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: rotas com {id} e rotas que referenciam Paciente pelo id.
// SITUAÇÃO: implementada.
import { RecursoNaoEncontradoException } from "./RecursoNaoEncontradoException";

export class PacienteNaoEncontradoException extends RecursoNaoEncontradoException {
  constructor(id: number) {
    super(`Paciente ${id} não encontrado`);
  }
}
