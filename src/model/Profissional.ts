// CAMADA: Model
// RESPONSABILIDADE: entidade da tabela `profissionais`, com o expediente (horário e dias de atendimento).
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma (só o Repository a conhece).
// SITUAÇÃO: implementada.
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("profissionais")
export class Profissional {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "varchar", length: 100 })
  especialidade!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefone!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  email!: string | null;

  // "HH:mm:ss" (o Postgres devolve o TIME assim)
  @Column({ name: "hora_inicio", type: "time" })
  horaInicio!: string;

  @Column({ name: "hora_fim", type: "time" })
  horaFim!: string;

  // dias da semana separados por vírgula: 0 = domingo ... 6 = sábado (ex.: "1,2,3,4,5")
  @Column({ name: "dias_atendimento", type: "varchar", length: 20 })
  diasAtendimento!: string;
}
