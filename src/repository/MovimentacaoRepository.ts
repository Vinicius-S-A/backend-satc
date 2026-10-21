// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar movimentações no banco. Não decide nada do domínio.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo MovimentacaoService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Movimentacao } from "../model/Movimentacao";

export class MovimentacaoRepository {
  private readonly repo: Repository<Movimentacao>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Movimentacao);
  }

  save(mov: Movimentacao): Promise<Movimentacao> {
    return this.repo.save(mov);
  }
  findAll(): Promise<Movimentacao[]> {
    return this.repo.find({ relations: { item: true }, order: { id: "ASC" } });
  }
  findById(id: number): Promise<Movimentacao | null> {
    return this.repo.findOne({ where: { id }, relations: { item: true } });
  }
}
