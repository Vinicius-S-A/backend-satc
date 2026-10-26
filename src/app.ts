// CAMADA: Config (composição)
// RESPONSABILIDADE: liga as camadas pelo construtor (Repository -> Mapper -> Service -> Controller)
//                   e registra rotas, Swagger e o tratador de erros.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: monta /categorias, /itens e /movimentacoes.
// SITUAÇÃO: implementada.
import express from "express";
import { DataSource } from "typeorm";
import { configurarOpenApi } from "./config/openapi";
import { apiExceptionHandler } from "./controller/ApiExceptionHandler";

// paciente
import { PacienteController } from "./controller/PacienteController";
import { PacienteMapper } from "./mapper/PacienteMapper";
import { PacienteRepository } from "./repository/PacienteRepository";
import { PacienteService } from "./service/PacienteService";

// profissional
import { ProfissionalController } from "./controller/ProfissionalController";
import { ProfissionalMapper } from "./mapper/ProfissionalMapper";
import { ProfissionalRepository } from "./repository/ProfissionalRepository";
import { ProfissionalService } from "./service/ProfissionalService";

// secretaria
import { SecretariaController } from "./controller/SecretariaController";
import { SecretariaMapper } from "./mapper/SecretariaMapper";
import { SecretariaRepository } from "./repository/SecretariaRepository";
import { SecretariaService } from "./service/SecretariaService";

// consulta
import { ConsultaController } from "./controller/ConsultaController";
import { ConsultaMapper } from "./mapper/ConsultaMapper";
import { ConsultaRepository } from "./repository/ConsultaRepository";
import { ConsultaService } from "./service/ConsultaService";

export function criarApp(ds: DataSource) {
  const pacientes = new PacienteController(new PacienteService(new PacienteRepository(ds),new PacienteMapper()));
  const profissionais = new ProfissionalController(new ProfissionalService(new ProfissionalRepository(ds),new ProfissionalMapper()));
  const secretarias = new SecretariaController(new SecretariaService(new SecretariaRepository(ds),new SecretariaMapper()));
  const consultas = new ConsultaController(new ConsultaService(new ConsultaRepository(ds),new ConsultaMapper(),new PacienteRepository(ds),new ProfissionalRepository(ds)));

  const app = express();
  app.use(express.json());
  configurarOpenApi(app);
  app.use("/pacientes", pacientes.router);
  app.use("/profissionais", profissionais.router);
  app.use("/secretarias", secretarias.router);
  app.use("/consultas", consultas.router);
  app.use(apiExceptionHandler);
  return app;
}
