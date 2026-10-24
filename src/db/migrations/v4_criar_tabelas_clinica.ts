
import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasClinica1700000000004
  implements MigrationInterface {

  async up(q: QueryRunner): Promise<void> {
    await q.query(`
      CREATE TABLE pacientes (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(100)
      );

      CREATE TABLE profissionais (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        especialidade VARCHAR(100) NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(100)
      );

      CREATE TABLE secretarias (
        id SERIAL PRIMARY KEY,
        nome VARCHAR(100) NOT NULL,
        cpf VARCHAR(14) UNIQUE NOT NULL,
        telefone VARCHAR(20),
        email VARCHAR(100),
        login VARCHAR(50) UNIQUE NOT NULL,
        senha VARCHAR(255) NOT NULL
      );

      CREATE TABLE consultas (
        id SERIAL PRIMARY KEY,
        paciente_id INTEGER NOT NULL
          REFERENCES pacientes(id),
        profissional_id INTEGER NOT NULL
          REFERENCES profissionais(id),
        data_hora TIMESTAMP NOT NULL,
        duracao_minutos INTEGER NOT NULL,
        status VARCHAR(20) NOT NULL DEFAULT 'agendada'
      );

      CREATE INDEX idx_consultas_paciente
        ON consultas(paciente_id);

      CREATE INDEX idx_consultas_profissional_horario
        ON consultas(profissional_id, data_hora);
    `);
  }

  async down(q: QueryRunner): Promise<void> {
    await q.query(`
      DROP TABLE consultas;
      DROP TABLE secretarias;
      DROP TABLE profissionais;
      DROP TABLE pacientes;
    `);
  }
}
