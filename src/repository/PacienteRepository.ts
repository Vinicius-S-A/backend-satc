
 // CAMADA: Repository
 // RESPONSABILIDADE: ler e gravar pacientes no banco via TypeORM.
 // REGRAS: nenhuma regra de negócio; apenas acesso aos dados.
 // ROTAS ATENDIDAS: utilizado pelo PacienteService.
 // SITUAÇÃO: implementada.

import { DataSource, Repository } from "typeorm";
import { Paciente } from "../model/Paciente";

export class PacienteRepository {
  private readonly repo: Repository<Paciente>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Paciente);
  }

  save(paciente: Paciente): Promise<Paciente> {
    return this.repo.save(paciente);
  }

  findAll(): Promise<Paciente[]> {
    return this.repo.find({ order: { id: "ASC" } });
  }

  findById(id: number): Promise<Paciente | null> {
    return this.repo.findOneBy({ id });
  }

  existsByCpf(cpf: string): Promise<boolean> {
    return this.repo.existsBy({ cpf });
  }
}
