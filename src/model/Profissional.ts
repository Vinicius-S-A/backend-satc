
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
}
