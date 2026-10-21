// CAMADA: Model
// RESPONSABILIDADE: entidade da tabela `itens` (deve bater com V2__criar_itens). Pertence a uma Categoria.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma (só o Repository a conhece).
// SITUAÇÃO: implementada.
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Categoria } from "./Categoria";

@Entity("itens")
export class Item {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;

  @Column({ type: "int" })
  quantidade!: number;

  @ManyToOne(() => Categoria, { nullable: false })
  @JoinColumn({ name: "categoria_id" })
  categoria!: Categoria;
}
