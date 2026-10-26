// CAMADA: Config
// RESPONSABILIDADE: documentação OpenAPI servida no Swagger UI (/swagger-ui) e em /v3/api-docs
//                   (importável no Postman). Atualize junto com docs/contrato-da-api.md.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: GET /swagger-ui e GET /v3/api-docs.
// SITUAÇÃO: implementada.
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const ref = (nome: string) => ({ $ref: `#/components/schemas/${nome}` });
const json = (schema: object) => ({ "application/json": { schema } });
const erro = (description: string) => ({ description, content: json(ref("ErroDTO")) });

// POST, GET e GET /{id} de uma entidade
function rotas(base: string, singular: string, entidade: string, erro400: string) {
  return {
    [`/${base}`]: {
      post: {
        summary: `Cadastra ${singular}`,
        requestBody: { required: true, content: json(ref(`${entidade}RequestDTO`)) },
        responses: {
          "201": { description: "Criado", content: json(ref(`${entidade}ResponseDTO`)) },
          "400": erro(erro400),
          ...(entidade === "Consulta" ? { "404": erro("Paciente ou profissional não encontrado") } : {})
        }
      },
      get: {
        summary: `Lista: ${base}`,
        responses: { "200": { description: "OK", content: json({ type: "array", items: ref(`${entidade}ResponseDTO`) }) } }
      }
    },
    [`/${base}/{id}`]: {
      get: {
        summary: `Busca ${singular} pelo id`,
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer", minimum: 1 } }],
        responses: {
          "200": { description: "Encontrado", content: json(ref(`${entidade}ResponseDTO`)) },
          "400": erro("Id inválido"),
          "404": erro("Não encontrado")
        }
      }
    }
  };
}

const str = (max: number, example?: string, nullable = false) => ({ type: "string", maxLength: max, nullable, ...(example ? { example } : {}) });

export const openApiSpec = {
  openapi: "3.0.3",
  info: { title: "Projeto Final - API", version: "1.0.0" },
  paths: {
    ...rotas("pacientes", "um paciente", "Paciente", "Dados inválidos ou CPF já cadastrado"),
    ...rotas("profissionais", "um profissional", "Profissional", "Dados inválidos"),
    ...rotas("secretarias", "uma secretária", "Secretaria", "Dados inválidos, CPF ou login já cadastrado"),
    ...rotas("consultas", "uma consulta", "Consulta", "Dados inválidos ou regra R1, R2 ou R3 violada")
  },
  components: {
    schemas: {
      PacienteRequestDTO: {
        type: "object",
        required: ["nome", "cpf"],
        properties: { nome: str(100, "Maria da Silva"), cpf: str(14, "123.456.789-00"), telefone: str(20, "48999999999", true), email: str(100, "maria@email.com", true) }
      },
      PacienteResponseDTO: {
        type: "object",
        properties: { id: { type: "integer" }, nome: str(100), cpf: str(14), telefone: str(20, undefined, true), email: str(100, undefined, true) }
      },
      ProfissionalRequestDTO: {
        type: "object",
        required: ["nome", "especialidade", "horaInicio", "horaFim", "diasAtendimento"],
        properties: {
          nome: str(100, "Dr. João Souza"),
          especialidade: str(100, "Cardiologia"),
          telefone: str(20, "48988888888", true),
          email: str(100, "joao@clinica.com", true),
          horaInicio: { type: "string", example: "08:00" },
          horaFim: { type: "string", example: "18:00" },
          diasAtendimento: { type: "array", items: { type: "integer", minimum: 0, maximum: 6 }, example: [1, 2, 3, 4, 5], description: "0 = domingo ... 6 = sábado" }
        }
      },
      ProfissionalResponseDTO: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: str(100),
          especialidade: str(100),
          telefone: str(20, undefined, true),
          email: str(100, undefined, true),
          horaInicio: { type: "string", example: "08:00" },
          horaFim: { type: "string", example: "18:00" },
          diasAtendimento: { type: "array", items: { type: "integer" } }
        }
      },
      SecretariaRequestDTO: {
        type: "object",
        required: ["nome", "cpf", "login", "senha"],
        properties: {
          nome: str(100, "Ana Lima"),
          cpf: str(14, "987.654.321-00"),
          telefone: str(20, undefined, true),
          email: str(100, undefined, true),
          login: { type: "string", minLength: 3, maxLength: 50, example: "ana.lima" },
          senha: { type: "string", minLength: 6, maxLength: 100, format: "password" }
        }
      },
      SecretariaResponseDTO: {
        type: "object",
        properties: { id: { type: "integer" }, nome: str(100), cpf: str(14), telefone: str(20, undefined, true), email: str(100, undefined, true), login: str(50) }
      },
      ConsultaRequestDTO: {
        type: "object",
        required: ["pacienteId", "profissionalId", "dataHora", "duracaoMinutos"],
        properties: {
          pacienteId: { type: "integer", example: 1 },
          profissionalId: { type: "integer", example: 1 },
          dataHora: { type: "string", example: "2026-11-02T14:30:00" },
          duracaoMinutos: { type: "integer", minimum: 5, maximum: 480, example: 30 }
        }
      },
      ConsultaResponseDTO: {
        type: "object",
        properties: {
          id: { type: "integer" },
          pacienteId: { type: "integer" },
          profissionalId: { type: "integer" },
          dataHora: { type: "string" },
          duracaoMinutos: { type: "integer" },
          status: { type: "string", example: "agendada" }
        }
      },
      ErroDTO: {
        type: "object",
        properties: {
          status: { type: "integer" },
          mensagem: { type: "string" },
          campos: { type: "array", items: { type: "object", properties: { campo: { type: "string" }, mensagem: { type: "string" } } } },
          timestamp: { type: "string" }
        }
      }
    }
  }
};

export function configurarOpenApi(app: Express): void {
  app.get("/v3/api-docs", (_req, res) => res.json(openApiSpec));
  app.use("/swagger-ui", swaggerUi.serve, swaggerUi.setup(openApiSpec));
}
