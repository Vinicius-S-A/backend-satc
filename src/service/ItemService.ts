// CAMADA: Service
// RESPONSABILIDADE: regras de negócio dos itens.
// REGRAS: a definir pelo grupo.
// ROTAS ATENDIDAS: as de /itens em docs/contrato-da-api.md.
// SITUAÇÃO: montada. A lógica entra quando a rota for implementada.
import { ItemMapper } from "../mapper/ItemMapper";
import { ItemRepository } from "../repository/ItemRepository";

export class ItemService {
  constructor(
    private readonly repository: ItemRepository,
    private readonly mapper: ItemMapper
  ) {}
}
