// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar categorias no banco. Não decide nada do domínio.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo CategoriaService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Categoria } from "../model/Categoria";

export class CategoriaRepository {
  private readonly repo: Repository<Categoria>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Categoria);
  }

  save(categoria: Categoria): Promise<Categoria> {
    return this.repo.save(categoria);
  }
  findAll(): Promise<Categoria[]> {
    return this.repo.find({ order: { id: "ASC" } });
  }
  findById(id: number): Promise<Categoria | null> {
    return this.repo.findOneBy({ id });
  }
  existsByNome(nome: string): Promise<boolean> {
    return this.repo.existsBy({ nome });
  }
}
