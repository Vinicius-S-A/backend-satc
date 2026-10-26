// CAMADA: Repository
// RESPONSABILIDADE: ler e gravar consultas no banco e responder se há consulta agendada
//                   sobrepondo um intervalo. Só consulta; quem decide o que fazer é o Service.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: usado pelo ConsultaService.
// SITUAÇÃO: implementado.
import { DataSource, Repository } from "typeorm";
import { Consulta } from "../model/Consulta";

export class ConsultaRepository {
  private readonly repo: Repository<Consulta>;

  constructor(dataSource: DataSource) {
    this.repo = dataSource.getRepository(Consulta);
  }

  save(consulta: Consulta): Promise<Consulta> {
    return this.repo.save(consulta);
  }
  findAll(): Promise<Consulta[]> {
    return this.repo.find({ relations: { paciente: true, profissional: true }, order: { id: "ASC" } });
  }
  findById(id: number): Promise<Consulta | null> {
    return this.repo.findOne({ where: { id }, relations: { paciente: true, profissional: true } });
  }

  existsConflitoDoProfissional(profissionalId: number, inicio: Date, fim: Date): Promise<boolean> {
    return this.existsConflito("profissional_id", profissionalId, inicio, fim);
  }
  existsConflitoDoPaciente(pacienteId: number, inicio: Date, fim: Date): Promise<boolean> {
    return this.existsConflito("paciente_id", pacienteId, inicio, fim);
  }

  // Há consulta agendada que começa antes de `fim` e termina depois de `inicio`?
  private existsConflito(coluna: "profissional_id" | "paciente_id", id: number, inicio: Date, fim: Date): Promise<boolean> {
    return this.repo
      .createQueryBuilder("c")
      .where(`"c"."${coluna}" = :id`, { id })
      .andWhere(`"c"."status" = 'agendada'`)
      .andWhere(`"c"."data_hora" < :fim`, { fim })
      .andWhere(`"c"."data_hora" + ("c"."duracao_minutos" * INTERVAL '1 minute') > :inicio`, { inicio })
      .getExists();
  }
}
