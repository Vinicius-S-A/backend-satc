// CAMADA: Config
// RESPONSABILIDADE: conexão com o PostgreSQL via TypeORM.
// REGRAS: nenhuma. `synchronize` fica SEMPRE false: o banco só muda por migration.
// ROTAS ATENDIDAS: nenhuma.
// SITUAÇÃO: implementada.
import "reflect-metadata";
import path from "path";
import { DataSource } from "typeorm";
import { Categoria } from "../model/Categoria";
import { Item } from "../model/Item";
import { Movimentacao } from "../model/Movimentacao";

export const dataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST ?? "localhost",
  port: Number(process.env.DB_PORT ?? 5439),
  username: process.env.DB_USER ?? "projeto",
  password: process.env.DB_PASSWORD ?? "projeto",
  database: process.env.DB_NAME ?? "projeto",
  entities: [Categoria, Item, Movimentacao],
  migrations: [path.join(__dirname, "../db/migrations/*.{ts,js}")],
  migrationsRun: true, // aplica as migrations pendentes quando a API sobe (como o Flyway)
  synchronize: false   // NUNCA true: nenhuma tabela é criada fora de migration
});
