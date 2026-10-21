// CAMADA: Service (exceção do domínio)
// RESPONSABILIDADE: lançada quando uma regra de negócio é violada. O ApiExceptionHandler a transforma em 400.
// REGRAS: todas (a mensagem deve explicar a regra violada, ex.: "R1: ...").
// ROTAS ATENDIDAS: qualquer rota que passe por uma regra.
// SITUAÇÃO: implementada.
export class RegraDeNegocioException extends Error {
  constructor(mensagem: string) {
    super(mensagem);
    this.name = "RegraDeNegocioException";
  }
}
