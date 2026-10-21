// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: exceção-mãe de todos os "não encontrado". O ApiExceptionHandler a transforma em 404.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: qualquer rota com {id}.
// SITUAÇÃO: implementada.
export class RecursoNaoEncontradoException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "RecursoNaoEncontradoException";
  }
}
