// CAMADA: Migration
// RESPONSABILIDADE: cria a tabela `itens`, com chave estrangeira para `categorias`.
import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarItens1700000000002 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TABLE itens (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL,
      quantidade INTEGER NOT NULL,
      categoria_id INTEGER NOT NULL REFERENCES categorias (id)
    )`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query("DROP TABLE itens");
  }
}
