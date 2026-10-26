import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarConsultas1700000000004 implements MigrationInterface {
  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE consultas (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER NOT NULL REFERENCES pacientes (id),
        profissional_id INTEGER NOT NULL REFERENCES profissionais (id),
        data_hora TIMESTAMP NOT NULL,
        duracao_minutos INTEGER NOT NULL CHECK (duracao_minutos > 0),
        status VARCHAR(20) NOT NULL DEFAULT 'agendada'
      );

      CREATE INDEX idx_consultas_paciente_horario ON consultas (paciente_id, data_hora);
      CREATE INDEX idx_consultas_profissional_horario ON consultas (profissional_id, data_hora);
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`DROP TABLE IF EXISTS consultas;`);
  }
}