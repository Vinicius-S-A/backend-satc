// CAMADA: Migration
// RESPONSABILIDADE: cria a tabela `movimentacoes`, com chave estrangeira para `itens`.
import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarMovimentacoes1700000000003 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TABLE movimentacoes (
      id SERIAL PRIMARY KEY,
      tipo VARCHAR(20) NOT NULL,
      quantidade INTEGER NOT NULL,
      data_hora TIMESTAMP NOT NULL,
      item_id INTEGER NOT NULL REFERENCES itens (id)
    )`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query("DROP TABLE movimentacoes");
  }
}
