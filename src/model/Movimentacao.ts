// CAMADA: Model
// RESPONSABILIDADE: entidade da tabela `movimentacoes` (deve bater com V3__criar_movimentacoes). Pertence a um Item.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma (só o Repository a conhece).
// SITUAÇÃO: implementada.
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Item } from "./Item";

@Entity("movimentacoes")
export class Movimentacao {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 20 })
  tipo!: string;

  @Column({ type: "int" })
  quantidade!: number;

  @Column({ name: "data_hora", type: "timestamp" })
  dataHora!: Date;

  @ManyToOne(() => Item, { nullable: false })
  @JoinColumn({ name: "item_id" })
  item!: Item;
}
