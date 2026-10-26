import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarSecretarias1700000000003 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE secretarias (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(100),
        login VARCHAR(50) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS secretarias;`);
  }
}