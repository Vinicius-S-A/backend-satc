# Clínica: Agendamento de Consultas

API de backend para o agendamento de consultas de uma clínica: a secretária cadastra pacientes e profissionais (com o expediente de cada um) e marca consultas, e o sistema impede marcações em conflito ou fora do horário de atendimento.

Projeto Final da disciplina de Backend (Engenharia de Software, SATC). **Etapa 1: arquitetura do backend.**

## Índice

- [Integrantes](#integrantes)
- [O problema](#o-problema)
- [Tecnologias](#tecnologias)
- [Arquitetura](#arquitetura)
- [Entidades](#entidades)
- [Rotas](#rotas)
- [Como executar](#como-executar)
- [Situação do projeto](#situação-do-projeto)
- [Documentação](#documentação)

## Integrantes

| Nome | GitHub |
|---|---|
| Vinícius Araujo | https://github.com/Vinicius-S-A |
| Yuri Ribeiro Nesi | https://github.com/YuriRibeiro29 |
| Elian Dalmolin | https://github.com/ElianDalmolin |

## O problema

**Tema sorteado:** Saúde e Bem-Estar (Agendamento clínico)

Em clínicas pequenas, a agenda costuma ficar em papel ou planilha. Isso permite que o mesmo profissional receba dois pacientes no mesmo horário, que um paciente marque duas consultas ao mesmo tempo e que consultas sejam marcadas fora do expediente do profissional. Quem sofre é o paciente, que chega e não é atendido, e a secretária, que precisa remarcar tudo. O sistema centraliza o cadastro e só aceita uma consulta quando o horário está livre e dentro da disponibilidade do profissional.

**Quem usa o sistema:**

| Quem | O que faz no sistema |
|---|---|
| Secretária | Cadastra pacientes, profissionais e secretárias, agenda consultas e consulta a agenda |
| Profissional | É cadastrado com especialidade, horário e dias de atendimento; recebe as consultas agendadas |
| Paciente | É cadastrado pela secretária e tem consultas agendadas em seu nome |

**Regras de negócio.** Todas estão implementadas no código. O que só confere formato (campo obrigatório, tamanho máximo, `horaFim` maior que `horaInicio`) é validação do DTO, não regra de negócio.

| # | Regra | Onde está no código | Rota que usa |
|---|---|---|---|
| R1 | Um profissional não pode ter duas consultas agendadas que se sobreponham no tempo (início e duração entram na conta; consultas coladas, uma terminando quando a outra começa, são permitidas) | `ConsultaService.criar` e `ConsultaRepository.existsConflitoDoProfissional` | `POST /consultas` |
| R2 | A consulta só pode ser marcada em dia de atendimento do profissional, e início + duração precisam caber no expediente dele | `ConsultaService.validarDisponibilidade` | `POST /consultas` |
| R3 | Um paciente não pode ter duas consultas agendadas que se sobreponham no tempo | `ConsultaService.criar` e `ConsultaRepository.existsConflitoDoPaciente` | `POST /consultas` |

Em `POST /consultas`, a ordem das verificações é: paciente e profissional existem (`404`), R2, R1 e R3 (`400`). Só consultas com status `agendada` entram na checagem de conflito.

**Fora do escopo:** autenticação e login das secretárias, edição e exclusão de cadastros, cancelamento e remarcação de consultas, e envio de lembretes ao paciente.

## Tecnologias

| O quê | Qual |
|---|---|
| Linguagem | TypeScript (Node.js 20+) |
| Framework | Express 5 |
| Acesso a dados | TypeORM (entidades com `@Entity`, repositórios que encapsulam o `Repository` do TypeORM) |
| Banco de dados | PostgreSQL 16, em Docker |
| Migrations | Migrations do TypeORM em `src/db/migrations`, aplicadas ao subir a API (`migrationsRun: true`). `synchronize` fica sempre `false` |
| Validação | Zod (schemas nos DTOs, aplicados no Controller) |
| Documentação da API | swagger-ui-express (OpenAPI 3 em `src/config/openapi.ts`) |

Na subida, `config/schemaValidator.ts` confere se cada entidade tem a tabela e as colunas criadas pelas migrations e derruba a API se algo não bater (o papel do `ddl-auto=validate` do Hibernate).

## Arquitetura

A API é organizada em camadas. Uma requisição entra pelo Controller, passa pelo Service, que aplica as regras de negócio, e chega ao banco pelo Repository; a resposta faz o caminho de volta. O Mapper converte DTO em entidade e entidade em DTO. A ligação entre as classes é feita pelo construtor, em `src/app.ts`.

Três regras mantêm as camadas separadas:

1. O Controller só enxerga DTOs e Services (nenhum import de `model`).
2. Regra de negócio mora no Service.
3. O banco só muda por migration nova, nunca editando uma que já rodou.

**Mapa da estrutura.** Uma linha por entidade. Em cada célula, a classe e a situação: **pronta**, **implementada** (já tem lógica), **em parte** (só uma parte das rotas) ou **montada** (criada, ligada às outras, ainda sem lógica).

| Entidade | Migration | Model | Repository | DTOs | Mapper | Service | Controller |
|---|---|---|---|---|---|---|---|
| Paciente | `V1_criar_tabelas_clinica.ts`, pronta | `Paciente`, pronta | `PacienteRepository`, pronto | `PacienteRequestDTO`, `PacienteResponseDTO`, prontos | `PacienteMapper`, implementado | `PacienteService`, implementado | `PacienteController`, implementado |
| Profissional | `V1_criar_tabelas_clinica.ts`, pronta | `Profissional`, pronta | `ProfissionalRepository`, pronto | `ProfissionalRequestDTO`, `ProfissionalResponseDTO`, prontos | `ProfissionalMapper`, implementado | `ProfissionalService`, implementado | `ProfissionalController`, implementado |
| Secretaria | `V1_criar_tabelas_clinica.ts`, pronta | `Secretaria`, pronta | `SecretariaRepository`, pronto | `SecretariaRequestDTO`, `SecretariaResponseDTO`, prontos | `SecretariaMapper`, implementado | `SecretariaService`, implementado | `SecretariaController`, implementado |
| Consulta | `V1_criar_tabelas_clinica.ts`, pronta | `Consulta`, pronta | `ConsultaRepository`, pronto (com as consultas de conflito) | `ConsultaRequestDTO`, `ConsultaResponseDTO`, prontos | `ConsultaMapper`, implementado | `ConsultaService`, implementado (R1, R2, R3) | `ConsultaController`, implementado |

**Classes de apoio**, usadas por todas as entidades:

| Camada | Classe | O que faz |
|---|---|---|
| Config | `database.ts` | Conexão com o PostgreSQL via TypeORM e lista de entidades e migrations |
| Config | `schemaValidator.ts` | Confere entidades x tabelas na subida |
| Config | `openapi.ts` | Especificação OpenAPI, servida no Swagger UI e em `/v3/api-docs` |
| Config | `app.ts` | Liga Repository, Mapper, Service e Controller pelo construtor e registra as rotas |
| Config | `server.ts` | Ponto de entrada: conecta, aplica migrations, valida o schema e sobe a API |
| Controller | `ApiExceptionHandler` | Transforma qualquer erro na resposta HTTP padronizada |
| Controller | `validar.ts` | Valida corpo e `{id}` com o schema Zod e lança `ValidacaoException` |
| DTO | `ErroDTO` | Formato único de erro da API |
| Service | `RegraDeNegocioException` | Regra violada, vira `400` |
| Service | `RecursoNaoEncontradoException` | Exceção-mãe dos "não encontrado", vira `404` |
| Service | `PacienteNaoEncontradoException`, `ProfissionalNaoEncontradoException`, `SecretariaNaoEncontradaException`, `ConsultaNaoEncontradaException` | Especializações da anterior, uma por entidade |

## Entidades

| Entidade | O que representa | Como se relaciona |
|---|---|---|
| Paciente | Pessoa atendida pela clínica (nome, CPF único, telefone e e-mail opcionais) | Tem várias consultas |
| Profissional | Quem atende: especialidade e expediente (`horaInicio`, `horaFim` e `diasAtendimento`, de 0 = domingo a 6 = sábado) | Tem várias consultas |
| Secretaria | Quem opera o sistema (CPF e login únicos, senha) | Sem relacionamento com as demais tabelas |
| Consulta | Atendimento marcado, com data e hora, duração em minutos e status (`agendada`) | Pertence a um paciente e a um profissional |

Atributos, tipos e o diagrama das tabelas estão em [docs/modelo-de-dominio.md](docs/modelo-de-dominio.md).

## Rotas

### As que já funcionam

As quatro entidades têm as mesmas três rotas.

| Verbo | Caminho | O que faz | Regra | Sucesso | Erros |
|---|---|---|---|---|---|
| `POST` | `/pacientes` | Cadastra um paciente | R4 | `201` | `400` |
| `GET` | `/pacientes` | Lista os pacientes | Nenhuma | `200` | |
| `GET` | `/pacientes/{id}` | Busca um paciente | Nenhuma | `200` | `400`, `404` |
| `POST` | `/profissionais` | Cadastra um profissional | Nenhuma | `201` | `400` |
| `GET` | `/profissionais` | Lista os profissionais | Nenhuma | `200` | |
| `GET` | `/profissionais/{id}` | Busca um profissional | Nenhuma | `200` | `400`, `404` |
| `POST` | `/secretarias` | Cadastra uma secretária | R5 | `201` | `400` |
| `GET` | `/secretarias` | Lista as secretárias | Nenhuma | `200` | |
| `GET` | `/secretarias/{id}` | Busca uma secretária | Nenhuma | `200` | `400`, `404` |
| `POST` | `/consultas` | Agenda uma consulta | R1, R2 e R3 | `201` | `400`, `404` |
| `GET` | `/consultas` | Lista as consultas | Nenhuma | `200` | |
| `GET` | `/consultas/{id}` | Busca uma consulta | Nenhuma | `200` | `400`, `404` |

Exemplo de requisição:

```http
POST /consultas
Content-Type: application/json

{
  "pacienteId": 1,
  "profissionalId": 1,
  "dataHora": "2026-11-02T14:30:00",
  "duracaoMinutos": 30
}
```

Resposta, `201 Created`:

```json
{
  "id": 1,
  "pacienteId": 1,
  "profissionalId": 1,
  "dataHora": "2026-11-02T17:30:00.000Z",
  "duracaoMinutos": 30,
  "status": "agendada"
}
```

A `dataHora` volta em UTC (ISO 8601). No exemplo, o servidor está em UTC-3, por isso 14:30 locais aparecem como 17:30Z. A data de entrada sem fuso é interpretada no fuso do servidor, que também é o usado por R2 para decidir o dia da semana e o expediente.

### Erros

Todo erro sai no mesmo formato. Este é o `400` de uma regra de negócio violada:

```json
{
  "status": 400,
  "mensagem": "R1: o profissional já tem uma consulta agendada que coincide com este horário",
  "timestamp": "2026-10-26T15:30:00.000Z"
}
```

Um campo inválido também devolve `400`, com a lista `campos` dizendo qual campo corrigir:

```json
{
  "status": 400,
  "mensagem": "Requisição inválida",
  "timestamp": "2026-10-26T15:30:00.000Z",
  "campos": [
    { "campo": "duracaoMinutos", "mensagem": "duracaoMinutos deve ser de no mínimo 5" }
  ]
}
```

Um id que não existe devolve `404`, e um JSON ilegível devolve `400`. Qualquer falha inesperada vira `500`, sem expor detalhes.

### As planejadas

Todas as rotas previstas no contrato já respondem. Atualização, exclusão e cancelamento de consulta ficaram fora do escopo desta etapa.

O contrato completo, com todas as rotas e os DTOs, está em [docs/contrato-da-api.md](docs/contrato-da-api.md).

## Como executar

Pré-requisitos: Node.js 20+, Docker.

```bash
docker compose up -d
npm install
npm run dev
```

Com a API no ar:

| Endereço | O que é |
|---|---|
| <http://localhost:8080/swagger-ui> | Swagger UI: testar requisições |
| <http://localhost:8080/v3/api-docs> | O contrato OpenAPI em JSON |

Para testar as rotas, use o Swagger UI ou o **Postman**. No Postman, importe todas as rotas de uma vez: **Import** → **Link** → `http://localhost:8080/v3/api-docs`.

Um roteiro rápido para ver as regras funcionando: cadastre um paciente (`POST /pacientes`), cadastre um profissional com `horaInicio` `08:00`, `horaFim` `18:00` e `diasAtendimento` `[1,2,3,4,5]`, e agende uma consulta numa segunda-feira às 14:30. Repetir a mesma consulta dispara R1 (profissional) e, com outro profissional, R3 (paciente). Agendar num domingo ou às 17:45 com 30 minutos dispara R2.

Variáveis de ambiente opcionais: `DB_HOST`, `DB_PORT` (padrão `5439`), `DB_USER`, `DB_PASSWORD`, `DB_NAME` e `PORT` (padrão `8080`). O banco também pode ser configurado por um arquivo `.env`.

Para parar: `Ctrl+C` na API e `docker compose stop` no banco. Para apagar o banco e rodar as migrations do zero: `docker compose down -v` e suba de novo.

## Situação do projeto

| Parte | Situação |
|---|---|
| Desenho | Completo: problema e regras neste README, modelo e contrato em `docs/` |
| Estrutura | As 4 entidades têm migration, entidade, Repository, DTOs, Mapper, Service e Controller |
| API e regras | As 12 rotas funcionam; R1 a R5 estão implementadas |

**Ainda não funciona:** edição e exclusão de cadastros, cancelamento e remarcação de consultas (o status é sempre `agendada`) e autenticação de secretárias. A senha da secretária é recebida e gravada, mas ainda não existe rota de login.

## Documentação

| Documento | O que tem |
|---|---|
| [Modelo de domínio](docs/modelo-de-dominio.md) | Entidades, relacionamentos, diagrama das tabelas, migrations |
| [Contrato da API](docs/contrato-da-api.md) | Todas as rotas, os DTOs, exemplos de JSON e erros |
| [Autoavaliação](docs/autoavaliacao.md) | Os critérios da revisão do código, marcados pelo grupo |
