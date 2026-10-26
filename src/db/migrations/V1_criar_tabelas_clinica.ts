import { MigrationInterface, QueryRunner } from "typeorm";

export class CriarTabelasClinica1700000000001 implements MigrationInterface {
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
        email VARCHAR(100),
        hora_inicio TIME NOT NULL,
        hora_fim TIME NOT NULL,
        dias_atendimento VARCHAR(20) NOT NULL,
        CONSTRAINT ck_profissionais_expediente CHECK (hora_inicio < hora_fim)
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
    await q.query(`
      DROP TABLE IF EXISTS consultas;
      DROP TABLE IF EXISTS secretarias;
      DROP TABLE IF EXISTS profissionais;
      DROP TABLE IF EXISTS pacientes;
    `);
  }
}
