import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarProfissionais1700000000002 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE profissionais (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        especialidade VARCHAR(100) NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(100),
        hora_inicio TIME NOT NULL,
        hora_fim TIME NOT NULL,
        dias_atendimento VARCHAR(20) NOT NULL,
        CONSTRAINT ck_profissionais_expediente CHECK (hora_inicio < hora_fim)
      );
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS profissionais;`);
  }
}