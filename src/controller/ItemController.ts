// CAMADA: Controller
// RESPONSABILIDADE: rotas HTTP de /itens.
// REGRAS: nenhuma (ficam no ItemService).
// ROTAS ATENDIDAS: as de /itens em docs/contrato-da-api.md.
// SITUAÇÃO: montada. As rotas entram quando forem implementadas.
import { Router } from "express";
import { ItemService } from "../service/ItemService";

export class ItemController {
  readonly router = Router();

  constructor(private readonly service: ItemService) {}
}
