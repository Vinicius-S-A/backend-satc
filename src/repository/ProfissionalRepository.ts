// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar profissionais no banco. Não decide nada do domínio.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo ProfissionalService e pelo ConsultaService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Profissional } from "../model/Profissional";

export class ProfissionalRepository {
  private readonly repo: Repository<Profissional>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Profissional);
  }

  save(profissional: Profissional): Promise<Profissional> {
    return this.repo.save(profissional);
  }
  findAll(): Promise<Profissional[]> {
    return this.repo.find({ order: { id: "ASC" } });
  }
  findById(id: number): Promise<Profissional | null> {
    return this.repo.findOneBy({ id });
  }
}
