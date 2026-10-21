// CAMADA: Model
// RESPONSABILIDADE: entidade da tabela `categorias` (deve bater com V1__criar_categorias).
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma (só o Repository a conhece).
// SITUAÇÃO: implementada.
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("categorias")
export class Categoria {
  @PrimaryGeneratedColumn({ type: "int" })
  id!: number;

  @Column({ type: "varchar", length: 100 })
  nome!: string;
}
