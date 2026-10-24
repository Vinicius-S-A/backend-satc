
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";

import { Paciente } from "./Paciente";
import { Profissional } from "./Profissional";

@Entity("consultas")
export class Consulta {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @ManyToOne(() => Paciente)
  @JoinColumn({ name: "paciente_id" })
  paciente!: Paciente;

  @ManyToOne(() => Profissional)
  @JoinColumn({ name: "profissional_id" })
  profissional!: Profissional;

  @Column({ type: "timestamp" })
  data_hora!: Date;

  @Column({ type: "int" })
  duracao_minutos!: number;

  @Column({ type: "varchar", length: 20, default: "agendada" })
  status!: string;
}
