# NOME DO PROJETO

> **Ponto de partida (apague este bloco ao preencher).** Projeto em TypeScript + Express + TypeORM + PostgreSQL,
> com a arquitetura da disciplina. Categoria, Item e Movimentacao são entidades provisórias: troque pelas do seu tema.

**Tema sorteado:** ...  **Integrantes:** ...

## Problema

## Regras de negócio

| # | Regra | Onde está |
|---|---|---|
| R1 | ... | `service/...Service.ts` |
| R2 | ... | |
| R3 | ... | |

## Mapa da estrutura

| Entidade | Migration | Model | Repository | DTOs | Mapper | Service | Controller | Situação |
|---|---|---|---|---|---|---|---|---|
| Categoria | V1 | Categoria | CategoriaRepository | CategoriaRequestDTO / ResponseDTO | CategoriaMapper | CategoriaService | CategoriaController | implementada |
| Item | V2 | Item | ItemRepository | ItemRequestDTO / ResponseDTO | ItemMapper | ItemService | ItemController | montada |
| Movimentacao | V3 | Movimentacao | MovimentacaoRepository | MovimentacaoRequestDTO / ResponseDTO | MovimentacaoMapper | MovimentacaoService | MovimentacaoController | montada |

Documentos de desenho: [docs/modelo-de-dominio.md](docs/modelo-de-dominio.md), [docs/contrato-da-api.md](docs/contrato-da-api.md), [docs/autoavaliacao.md](docs/autoavaliacao.md).

## Rotas

Veja [docs/contrato-da-api.md](docs/contrato-da-api.md). Swagger UI: `http://localhost:8080/swagger-ui`. OpenAPI (Postman): `http://localhost:8080/v3/api-docs`.

## Como executar

Requisitos: Node 20+ e Docker.

```bash
docker compose up -d      # PostgreSQL na porta 5439
npm install
npm run dev               # aplica as migrations e sobe a API na porta 8080
```

Variáveis opcionais: `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `PORT`.

## O que funciona e o que não

- Funciona: (preencher)
- Montado, ainda sem rotas: (preencher)

## Como o projeto atende os critérios (outra linguagem)

| Conceito da disciplina (Java) | Neste projeto |
|---|---|
| Flyway | Migrations do TypeORM em `src/db/migrations`, aplicadas ao subir (`migrationsRun: true`) |
| `ddl-auto=validate` | `synchronize: false` + `config/schemaValidator.ts`, que falha a subida se entidade e tabela não baterem |
| `@Entity` | Classes com `@Entity` em `src/model` |
| `JpaRepository` | Classes em `src/repository` que encapsulam o `Repository` do TypeORM |
| `record` + `@Valid` | Schemas Zod e interfaces em `src/dto`, validados no Controller por `controller/validar.ts` |
| `@RestControllerAdvice` | `controller/ApiExceptionHandler.ts` (middleware de erro) |
| `RecursoNaoEncontradoException` / `RegraDeNegocioException` | `service/exceptions/` |
| Swagger / springdoc | `swagger-ui-express` em `config/openapi.ts` |
| Injeção pelo construtor | Ligação em `src/app.ts` |

## Regra das camadas

1. O Controller só enxerga DTOs e Services (nenhum import de `model`).
2. Regra de negócio mora no Service.
3. O banco só muda por migration nova, nunca editando uma que já rodou.
