// CAMADA: Migration
// RESPONSABILIDADE: cria a tabela `categorias`. Nunca edite uma migration que já rodou: crie uma nova.
import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarCategorias1700000000001 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`CREATE TABLE categorias (
      id SERIAL PRIMARY KEY,
      nome VARCHAR(100) NOT NULL
    )`);
  }
  async down(q: QueryRunner): Promise<void> {
    await q.query("DROP TABLE categorias");
  }
}
