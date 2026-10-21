// CAMADA: Controller
// RESPONSABILIDADE: rotas HTTP de /movimentacoes.
// REGRAS: nenhuma (ficam no MovimentacaoService).
// ROTAS ATENDIDAS: as de /movimentacoes em docs/contrato-da-api.md.
// SITUAÇÃO: montada. As rotas entram quando forem implementadas.
import { Router } from "express";
import { MovimentacaoService } from "../service/MovimentacaoService";

export class MovimentacaoController {
  readonly router = Router();

  constructor(private readonly service: MovimentacaoService) {}
}
