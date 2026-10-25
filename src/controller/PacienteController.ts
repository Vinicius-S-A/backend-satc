
 // CAMADA: Controller
 // RESPONSABILIDADE: rotas HTTP de /pacientes; valida os dados e chama o Service.
 // REGRAS: nenhuma regra de negócio fica nesta camada.
 // ROTAS ATENDIDAS: POST /pacientes, GET /pacientes, GET /pacientes/:id.
 // SITUAÇÃO: implementada.

import { Request, Response, Router } from "express";
import { PacienteRequestSchema } from "../dto/PacienteRequestDTO";
import { PacienteService } from "../service/PacienteService";
import { IdSchema, validar } from "./validar";

export class PacienteController {
  readonly router = Router();

  constructor(private readonly service: PacienteService) {
    this.router.post("/", (req, res) => this.criar(req, res));
    this.router.get("/", (req, res) => this.listar(req, res));
    this.router.get("/:id", (req, res) => this.buscarPorId(req, res));
  }

  private async criar(req: Request, res: Response) {
    const dto = validar(PacienteRequestSchema, req.body);
    res.status(201).json(await this.service.criar(dto));
  }

  private async listar(_req: Request, res: Response) {
    res.status(200).json(await this.service.listar());
  }

  private async buscarPorId(req: Request, res: Response) {
    const id = validar(IdSchema, req.params.id);
    res.status(200).json(await this.service.buscarPorId(id));
  }
}
