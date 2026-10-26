// CAMADA: Model
// RESPONSABILIDADE: entidade da tabela `consultas`. Liga um Paciente a um Profissional em um horário.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma (só o Repository a conhece).
// SITUAÇÃO: implementada.
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Paciente } from "./Paciente";
import { Profissional } from "./Profissional";

@Entity("consultas")
export class Consulta {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @ManyToOne(() => Paciente, { nullable: false })
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente;

  @ManyToOne(() => Profissional, { nullable: false })
  @JoinColumn({ name: "profissional_id" })
  profissional!: Profissional;

  @Column({ name: "data_hora", type: "timestamp" })
  dataHora!: Date;

  @Column({ name: "duracao_minutos", type: "int" })
  duracaoMinutos!: number;

  @Column({ type: "varchar", length: 20, default: "agendada" })
  status!: string;
}
