// CAMADA: Controller
// RESPONSABILIDADE: rotas HTTP de /consultas. Valida o DTO, chama o Service e devolve status e corpo.
//                   Não importa nada de `model` e não decide nada do domínio.
// REGRAS: nenhuma (ficam no ConsultaService).
// ROTAS ATENDIDAS: POST /consultas, GET /consultas, GET /consultas/:id.
// SITUAÇÃO: implementada.
import { Request, Response, Router } from "express";
import { ConsultaRequestSchema } from "../dto/ConsultaRequestDTO";
import { ConsultaService } from "../service/ConsultaService";
import { IdSchema, validar } from "./validar";

export class ConsultaController {
  readonly router = Router();

  constructor(private readonly service: ConsultaService) {
    this.router.post("/", (req, res) => this.criar(req, res));
    this.router.get("/", (req, res) => this.listar(req, res));
    this.router.get("/:id", (req, res) => this.buscarPorId(req, res));
  }

  private async criar(req: Request, res: Response) {
    const dto = validar(ConsultaRequestSchema, req.body);
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
