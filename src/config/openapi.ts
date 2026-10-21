// CAMADA: Config
// RESPONSABILIDADE: documentação OpenAPI servida no Swagger UI (/swagger-ui) e em /v3/api-docs
//                   (importável no Postman). Atualize junto com docs/contrato-da-api.md.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: GET /swagger-ui e GET /v3/api-docs.
// SITUAÇÃO: implementada.
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const erro = { $ref: "#/components/schemas/ErroDTO" };
const json = (schema: object) => ({ "application/json": { schema } });

export const openApiSpec = {
  openapi: "3.0.3",
  info: { title: "Projeto Final - API", version: "1.0.0" },
  paths: {
    "/categorias": {
      post: {
        summary: "Cria uma categoria",
        requestBody: { required: true, content: json({ $ref: "#/components/schemas/CategoriaRequestDTO" }) },
        responses: {
          "201": { description: "Criada", content: json({ $ref: "#/components/schemas/CategoriaResponseDTO" }) },
          "400": { description: "Campo inválido ou regra violada", content: json(erro) }
        }
      },
      get: {
        summary: "Lista as categorias",
        responses: { "200": { description: "OK", content: json({ type: "array", items: { $ref: "#/components/schemas/CategoriaResponseDTO" } }) } }
      }
    },
    "/categorias/{id}": {
      get: {
        summary: "Busca uma categoria",
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }],
        responses: {
          "200": { description: "OK", content: json({ $ref: "#/components/schemas/CategoriaResponseDTO" }) },
          "404": { description: "Não encontrada", content: json(erro) }
        }
      }
    }
  },
  components: {
    schemas: {
      CategoriaRequestDTO: { type: "object", required: ["nome"], properties: { nome: { type: "string", maxLength: 100 } } },
      CategoriaResponseDTO: { type: "object", properties: { id: { type: "integer" }, nome: { type: "string" } } },
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
