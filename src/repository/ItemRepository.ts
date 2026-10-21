// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar itens no banco. Não decide nada do domínio.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo ItemService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Item } from "../model/Item";

export class ItemRepository {
  private readonly repo: Repository<Item>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Item);
  }

  save(item: Item): Promise<Item> {
    return this.repo.save(item);
  }
  findAll(): Promise<Item[]> {
    return this.repo.find({ relations: { categoria: true }, order: { id: "ASC" } });
  }
  findById(id: number): Promise<Item | null> {
    return this.repo.findOne({ where: { id }, relations: { categoria: true } });
  }
}
