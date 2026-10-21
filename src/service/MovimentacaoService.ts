// CAMADA: Service
// RESPONSABILIDADE: regras de negócio das movimentações.
// REGRAS: a definir pelo grupo (use RegraDeNegocioException com a mensagem "R1: ...").
// ROTAS ATENDIDAS: as de /movimentacoes em docs/contrato-da-api.md.
// SITUAÇÃO: montada. A lógica entra quando a rota for implementada.
import { MovimentacaoMapper } from "../mapper/MovimentacaoMapper";
import { MovimentacaoRepository } from "../repository/MovimentacaoRepository";

export class MovimentacaoService {
  constructor(
    private readonly repository: MovimentacaoRepository,
    private readonly mapper: MovimentacaoMapper
  ) {}
}
