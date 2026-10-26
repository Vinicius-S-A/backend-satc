// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar secretárias no banco. Não decide nada do domínio.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo SecretariaService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Secretaria } from "../model/Secretaria";

export class SecretariaRepository {
  private readonly repo: Repository<Secretaria>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Secretaria);
  }

  save(secretaria: Secretaria): Promise<Secretaria> {
    return this.repo.save(secretaria);
  }
  findAll(): Promise<Secretaria[]> {
    return this.repo.find({ order: { id: "ASC" } });
  }
  findById(id: number): Promise<Secretaria | null> {
    return this.repo.findOneBy({ id });
  }
  existsByCpf(cpf: string): Promise<boolean> {
    return this.repo.existsBy({ cpf });
  }
  existsByLogin(login: string): Promise<boolean> {
    return this.repo.existsBy({ login });
  }
}
