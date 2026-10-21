// CAMADA: Controller
// RESPONSABILIDADE: ponto único que transforma erros em resposta HTTP no formato ErroDTO.
//   JSON ilegível -> 400 | campo inválido -> 400 com `campos` | RegraDeNegocioException -> 400
//   RecursoNaoEncontradoException -> 404 | qualquer outro -> 500
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: todas, em caso de erro.
// SITUAÇÃO: implementada.
import { NextFunction, Request, Response } from "express";
import { ErroDTO } from "../dto/ErroDTO";
import { RecursoNaoEncontradoException } from "../service/exceptions/RecursoNaoEncontradoException";
import { RegraDeNegocioException } from "../service/exceptions/RegraDeNegocioException";
import { ValidacaoException } from "./validar";

function erro(res: Response, status: number, mensagem: string, campos?: ErroDTO["campos"]) {
  const corpo: ErroDTO = { status, mensagem, timestamp: new Date().toISOString(), ...(campos ? { campos } : {}) };
  res.status(status).json(corpo);
}

export function apiExceptionHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  if (err instanceof ValidacaoException) return erro(res, 400, err.message, err.campos);
  if (err instanceof RegraDeNegocioException) return erro(res, 400, err.message);
  if (err instanceof RecursoNaoEncontradoException) return erro(res, 404, err.message);
  if (err instanceof SyntaxError) return erro(res, 400, "JSON ilegível");
  console.error(err);
  erro(res, 500, "Erro interno do servidor");
}
