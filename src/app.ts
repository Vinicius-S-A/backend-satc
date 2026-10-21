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
import { CategoriaController } from "./controller/CategoriaController";
import { ItemController } from "./controller/ItemController";
import { MovimentacaoController } from "./controller/MovimentacaoController";
import { CategoriaMapper } from "./mapper/CategoriaMapper";
import { ItemMapper } from "./mapper/ItemMapper";
import { MovimentacaoMapper } from "./mapper/MovimentacaoMapper";
import { CategoriaRepository } from "./repository/CategoriaRepository";
import { ItemRepository } from "./repository/ItemRepository";
import { MovimentacaoRepository } from "./repository/MovimentacaoRepository";
import { CategoriaService } from "./service/CategoriaService";
import { ItemService } from "./service/ItemService";
import { MovimentacaoService } from "./service/MovimentacaoService";

export function criarApp(ds: DataSource) {
  const categorias = new CategoriaController(new CategoriaService(new CategoriaRepository(ds), new CategoriaMapper()));
  const itens = new ItemController(new ItemService(new ItemRepository(ds), new ItemMapper()));
  const movimentacoes = new MovimentacaoController(new MovimentacaoService(new MovimentacaoRepository(ds), new MovimentacaoMapper()));

  const app = express();
  app.use(express.json());
  configurarOpenApi(app);
  app.use("/categorias", categorias.router);
  app.use("/itens", itens.router);
  app.use("/movimentacoes", movimentacoes.router);
  app.use(apiExceptionHandler);
  return app;
}
