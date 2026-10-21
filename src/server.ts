// CAMADA: Config (entrada)
// RESPONSABILIDADE: conecta no banco, aplica as migrations, confere entidades x tabelas e sobe a API.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma.
// SITUAÇÃO: implementada.
import { dataSource } from "./config/database";
import { validarEntidadesContraBanco } from "./config/schemaValidator";
import { criarApp } from "./app";

async function main() {
  await dataSource.initialize(); // roda as migrations pendentes
  await validarEntidadesContraBanco(dataSource); // falha se alguma entidade não bater com a tabela
  const porta = Number(process.env.PORT ?? 8080);
  criarApp(dataSource).listen(porta, () => {
    console.log(`API no ar: http://localhost:${porta}  |  Swagger: http://localhost:${porta}/swagger-ui`);
  });
}

main().catch((e) => {
  console.error("Falha ao subir a API:", e);
  process.exit(1);
});
