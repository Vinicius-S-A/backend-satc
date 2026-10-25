
import { Express } from "express";
import swaggerUi from "swagger-ui-express";

const erro = { $ref: "#/components/schemas/ErroDTO" };
const json = (schema: object) => ({
  "application/json": { schema }
});

export const openApiSpec = {
  openapi: "3.0.3",
  info: {
    title: "Projeto Final - API",
    version: "1.0.0"
  },
  paths: {
    "/categorias": {
      post: {
        summary: "Cria uma categoria",
        requestBody: {
          required: true,
          content: json({
            $ref: "#/components/schemas/CategoriaRequestDTO"
          })
        },
        responses: {
          "201": {
            description: "Criada",
            content: json({
              $ref: "#/components/schemas/CategoriaResponseDTO"
            })
          },
          "400": {
            description: "Campo inválido ou regra violada",
            content: json(erro)
          }
        }
      },
      get: {
        summary: "Lista as categorias",
        responses: {
          "200": {
            description: "OK",
            content: json({
              type: "array",
              items: {
                $ref: "#/components/schemas/CategoriaResponseDTO"
              }
            })
          }
        }
      }
    },

    "/categorias/{id}": {
      get: {
        summary: "Busca uma categoria",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer" }
          }
        ],
        responses: {
          "200": {
            description: "Encontrada",
            content: json({
              $ref: "#/components/schemas/CategoriaResponseDTO"
            })
          },
          "404": {
            description: "Não encontrada",
            content: json(erro)
          }
        }
      }
    },

    "/pacientes": {
      post: {
        summary: "Cadastra um paciente",
        requestBody: {
          required: true,
          content: json({
            $ref: "#/components/schemas/PacienteRequestDTO"
          })
        },
        responses: {
          "201": {
            description: "Paciente cadastrado",
            content: json({
              $ref: "#/components/schemas/PacienteResponseDTO"
            })
          },
          "400": {
            description: "Dados inválidos ou CPF já cadastrado",
            content: json(erro)
          }
        }
      },
      get: {
        summary: "Lista os pacientes",
        responses: {
          "200": {
            description: "Lista de pacientes",
            content: json({
              type: "array",
              items: {
                $ref: "#/components/schemas/PacienteResponseDTO"
              }
            })
          }
        }
      }
    },

    "/pacientes/{id}": {
      get: {
        summary: "Busca um paciente pelo ID",
        parameters: [
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "integer", minimum: 1 }
          }
        ],
        responses: {
          "200": {
            description: "Paciente encontrado",
            content: json({
              $ref: "#/components/schemas/PacienteResponseDTO"
            })
          },
          "400": {
            description: "ID inválido",
            content: json(erro)
          },
          "404": {
            description: "Paciente não encontrado",
            content: json(erro)
          }
        }
      }
    }
  },

  components: {
    schemas: {
      CategoriaRequestDTO: {
        type: "object",
        required: ["nome"],
        properties: {
          nome: { type: "string", maxLength: 100 }
        }
      },

      CategoriaResponseDTO: {
        type: "object",
        properties: {
          id: { type: "integer" },
          nome: { type: "string" }
        }
      },

      PacienteRequestDTO: {
        type: "object",
        required: ["nome", "cpf"],
        properties: {
          nome: {
            type: "string",
            maxLength: 100,
            example: "Maria da Silva"
          },
          cpf: {
            type: "string",
            maxLength: 14,
            example: "123.456.789-00"
          },
          telefone: {
            type: "string",
            nullable: true,
            maxLength: 20,
            example: "48999999999"
          },
          email: {
            type: "string",
            nullable: true,
            maxLength: 100,
            example: "maria@email.com"
          }
        }
      },

      PacienteResponseDTO: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          nome: { type: "string", example: "Maria da Silva" },
          cpf: { type: "string", example: "123.456.789-00" },
          telefone: { type: "string", nullable: true },
          email: { type: "string", nullable: true }
        }
      },

      ErroDTO: {
        type: "object",
        properties: {
          status: { type: "integer" },
          mensagem: { type: "string" },
          campos: {
            type: "array",
            items: {
              type: "object",
              properties: {
                campo: { type: "string" },
                mensagem: { type: "string" }
              }
            }
          },
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
