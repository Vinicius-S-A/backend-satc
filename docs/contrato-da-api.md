# Contrato da API

O contrato é o que o cliente da API enxerga: rotas, JSON e status. As quatro entidades têm as mesmas três rotas (cadastrar, listar e buscar por id), e todas já funcionam.

## Convenções

| Item | Valor |
|---|---|
| Endereço base | `http://localhost:8080` |
| Formato | JSON, na requisição e na resposta |
| Datas e horas | Consulta: `AAAA-MM-DDTHH:mm:ss` na entrada (sem fuso, lida no fuso do servidor); na saída, ISO 8601 em UTC. Expediente do profissional: `HH:mm` |
| Ids | Inteiros positivos, gerados pelo banco |
| Erros | Sempre no formato `ErroDTO` (ver [Erros](#erros)) |
| Documentação viva | `http://localhost:8080/swagger-ui` |
| Contrato OpenAPI (Postman) | `http://localhost:8080/v3/api-docs` |

## Rotas

Coluna **Funciona**: `sim` para as rotas que já respondem nesta etapa.

### Pacientes

| Verbo | Caminho | O que faz | Entrada | Saída | Sucesso | Erros | Funciona |
|---|---|---|---|---|---|---|---|
| `GET` | `/pacientes` | Lista os pacientes | Nenhuma | lista de `PacienteResponseDTO` | `200` | Nenhum | sim |
| `GET` | `/pacientes/{id}` | Busca um paciente | Nenhuma | `PacienteResponseDTO` | `200` | `400`, `404` | sim |
| `POST` | `/pacientes` | Cadastra um paciente | `PacienteRequestDTO` | `PacienteResponseDTO` | `201` | `400` | sim |

### Profissionais

| Verbo | Caminho | O que faz | Entrada | Saída | Sucesso | Erros | Funciona |
|---|---|---|---|---|---|---|---|
| `GET` | `/profissionais` | Lista os profissionais | Nenhuma | lista de `ProfissionalResponseDTO` | `200` | Nenhum | sim |
| `GET` | `/profissionais/{id}` | Busca um profissional | Nenhuma | `ProfissionalResponseDTO` | `200` | `400`, `404` | sim |
| `POST` | `/profissionais` | Cadastra um profissional | `ProfissionalRequestDTO` | `ProfissionalResponseDTO` | `201` | `400` | sim |

### Secretárias

| Verbo | Caminho | O que faz | Entrada | Saída | Sucesso | Erros | Funciona |
|---|---|---|---|---|---|---|---|
| `GET` | `/secretarias` | Lista as secretárias | Nenhuma | lista de `SecretariaResponseDTO` | `200` | Nenhum | sim |
| `GET` | `/secretarias/{id}` | Busca uma secretária | Nenhuma | `SecretariaResponseDTO` | `200` | `400`, `404` | sim |
| `POST` | `/secretarias` | Cadastra uma secretária | `SecretariaRequestDTO` | `SecretariaResponseDTO` | `201` | `400` | sim |

### Consultas

| Verbo | Caminho | O que faz | Entrada | Saída | Sucesso | Erros | Funciona |
|---|---|---|---|---|---|---|---|
| `GET` | `/consultas` | Lista as consultas | Nenhuma | lista de `ConsultaResponseDTO` | `200` | Nenhum | sim |
| `GET` | `/consultas/{id}` | Busca uma consulta | Nenhuma | `ConsultaResponseDTO` | `200` | `400`, `404` | sim |
| `POST` | `/consultas` | Agenda uma consulta | `ConsultaRequestDTO` | `ConsultaResponseDTO` | `201` | `400`, `404` | sim |

### Rotas que não são CRUD

O projeto não tem rotas fora do padrão cadastrar, listar e buscar. As regras de negócio agem dentro do `POST` de cada recurso:

| Verbo | Caminho | O que faz | Regra | Sucesso | Erros |
|---|---|---|---|---|---|
| `POST` | `/consultas` | Agenda a consulta só se o horário estiver livre para o profissional e para o paciente e dentro do expediente | R1, R2 e R3 | `201` | `400`, `404` |
| `POST` | `/pacientes` | Cadastra o paciente só se o CPF ainda não existir | R4 | `201` | `400` |
| `POST` | `/secretarias` | Cadastra a secretária só se o CPF e o login ainda não existirem | R5 | `201` | `400` |

As regras estão descritas no [README](../README.md#o-problema). Em `POST /consultas`, as verificações rodam nesta ordem: paciente e profissional existem (`404`), depois R2, R1 e R3 (`400`).

Atualização, exclusão e cancelamento de consulta não fazem parte desta etapa.

## DTOs

O que entra não é igual ao que sai: o cliente não envia `id` nem campos que a API decide (como o `status` da consulta).

| DTO | Direção | Campos | Validações |
|---|---|---|---|
| `PacienteRequestDTO` | entrada | `nome`, `cpf`, `telefone`, `email` | `nome` e `cpf` obrigatórios; `nome` até 100, `cpf` até 14, `telefone` até 20, `email` até 100; `telefone` e `email` opcionais |
| `PacienteResponseDTO` | saída | `id`, `nome`, `cpf`, `telefone`, `email` | Nenhuma |
| `ProfissionalRequestDTO` | entrada | `nome`, `especialidade`, `telefone`, `email`, `horaInicio`, `horaFim`, `diasAtendimento` | `nome`, `especialidade`, `horaInicio`, `horaFim` e `diasAtendimento` obrigatórios; horas no formato `HH:mm`; `horaFim` maior que `horaInicio`; `diasAtendimento` com ao menos um dia, cada um de 0 a 6; `email`, se enviado, em formato válido |
| `ProfissionalResponseDTO` | saída | `id`, `nome`, `especialidade`, `telefone`, `email`, `horaInicio`, `horaFim`, `diasAtendimento` | Nenhuma |
| `SecretariaRequestDTO` | entrada | `nome`, `cpf`, `telefone`, `email`, `login`, `senha` | `nome`, `cpf`, `login` e `senha` obrigatórios; `login` de 3 a 50; `senha` de 6 a 100; `email`, se enviado, em formato válido |
| `SecretariaResponseDTO` | saída | `id`, `nome`, `cpf`, `telefone`, `email`, `login` | Nenhuma. Nunca devolve a senha |
| `ConsultaRequestDTO` | entrada | `pacienteId`, `profissionalId`, `dataHora`, `duracaoMinutos` | Todos obrigatórios; ids inteiros positivos; `dataHora` no formato `AAAA-MM-DDTHH:mm:ss`; `duracaoMinutos` inteiro de 5 a 480 |
| `ConsultaResponseDTO` | saída | `id`, `pacienteId`, `profissionalId`, `dataHora`, `duracaoMinutos`, `status` | Nenhuma |
| `ErroDTO` | saída | `status`, `mensagem`, `timestamp`, `campos` (opcional) | Nenhuma |

## Exemplos

Um par requisição/resposta por entidade.

### `POST /pacientes`

Requisição:

```json
{
  "nome": "Maria da Silva",
  "cpf": "123.456.789-00",
  "telefone": "48999999999",
  "email": "maria@email.com"
}
```

Resposta, `201 Created`:

```json
{
  "id": 1,
  "nome": "Maria da Silva",
  "cpf": "123.456.789-00",
  "telefone": "48999999999",
  "email": "maria@email.com"
}
```

### `POST /profissionais`

Requisição:

```json
{
  "nome": "Dr. João Souza",
  "especialidade": "Cardiologia",
  "telefone": "48988888888",
  "email": "joao@clinica.com",
  "horaInicio": "08:00",
  "horaFim": "18:00",
  "diasAtendimento": [1, 2, 3, 4, 5]
}
```

Resposta, `201 Created`:

```json
{
  "id": 1,
  "nome": "Dr. João Souza",
  "especialidade": "Cardiologia",
  "telefone": "48988888888",
  "email": "joao@clinica.com",
  "horaInicio": "08:00",
  "horaFim": "18:00",
  "diasAtendimento": [1, 2, 3, 4, 5]
}
```

### `POST /secretarias`

Requisição:

```json
{
  "nome": "Ana Lima",
  "cpf": "987.654.321-00",
  "login": "ana.lima",
  "senha": "segredo123"
}
```

Resposta, `201 Created` (sem a senha):

```json
{
  "id": 1,
  "nome": "Ana Lima",
  "cpf": "987.654.321-00",
  "telefone": null,
  "email": null,
  "login": "ana.lima"
}
```

### `POST /consultas`

Requisição:

```json
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

A `dataHora` volta em UTC. No exemplo, o servidor está em UTC-3, por isso 14:30 locais aparecem como 17:30Z.

## Erros

Todo erro sai no mesmo formato. Este é o `404` de `GET /consultas/999`:

```json
{
  "status": 404,
  "mensagem": "Consulta 999 não encontrada",
  "timestamp": "2026-10-26T15:30:00.000Z"
}
```

Este é o `400` de uma regra de negócio violada em `POST /consultas` (R2, horário fora do expediente):

```json
{
  "status": 400,
  "mensagem": "R2: a consulta (início + duração) deve caber no expediente do profissional, das 08:00 às 18:00",
  "timestamp": "2026-10-26T15:30:00.000Z"
}
```

No `400` de validação, a lista `campos` traz um item por campo inválido, no formato `{"campo": "duracaoMinutos", "mensagem": "duracaoMinutos deve ser de no mínimo 5"}`. Nos erros sem campo específico, o item `campos` não aparece.

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

| Status | Quando acontece neste projeto |
|---|---|
| `400` | JSON ilegível, campo inválido no DTO de entrada ou `id` da URL que não é um inteiro positivo |
| `400` | Regra de negócio violada: a `mensagem` diz qual regra barrou o pedido (R1 a R3 em `POST /consultas`; CPF ou login já cadastrado em `POST /pacientes` e `POST /secretarias`) |
| `404` | Id que não existe, ou `pacienteId` / `profissionalId` inexistente em `POST /consultas` |
| `500` | Falha inesperada. A resposta traz só `Erro interno do servidor`, sem detalhes |
