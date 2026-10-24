
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("secretarias")
export class Secretaria {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "varchar", length: 14, unique: true })
  cpf!: string;

  @Column({ type: "varchar", length: 20, nullable: true })
  telefone!: string | null;

  @Column({ type: "varchar", length: 100, nullable: true })
  email!: string | null;

  @Column({ type: "varchar", length: 50, unique: true })
  login!: string;

  @Column({ type: "varchar", length: 255 })
  senha!: string;
}
