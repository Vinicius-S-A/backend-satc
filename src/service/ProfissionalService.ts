// CAMADA: Service
// RESPONSABILIDADE: casos de uso dos profissionais; coordena Mapper e Repository.
// REGRAS: nenhuma aqui. A disponibilidade do profissional é aplicada no ConsultaService (R2).
// ROTAS ATENDIDAS: as de /profissionais em docs/contrato-da-api.md.
// SITUAÇÃO: implementada.
import { ProfissionalRequestDTO } from "../dto/ProfissionalRequestDTO";
import { ProfissionalResponseDTO } from "../dto/ProfissionalResponseDTO";
import { ProfissionalMapper } from "../mapper/ProfissionalMapper";
import { ProfissionalRepository } from "../repository/ProfissionalRepository";
import { ProfissionalNaoEncontradoException } from "./exceptions/ProfissionalNaoEncontradoException";

export class ProfissionalService {
  constructor(
    private readonly repository: ProfissionalRepository,
    private readonly mapper: ProfissionalMapper
  ) {}

  async criar(dto: ProfissionalRequestDTO): Promise<ProfissionalResponseDTO> {
    const salvo = await this.repository.save(this.mapper.toEntity(dto));
    return this.mapper.toResponse(salvo);
  }

  async listar(): Promise<ProfissionalResponseDTO[]> {
    return (await this.repository.findAll()).map((p) => this.mapper.toResponse(p));
  }

  async buscarPorId(id: number): Promise<ProfissionalResponseDTO> {
    const p = await this.repository.findById(id);
    if (!p) throw new ProfissionalNaoEncontradoException(id);
    return this.mapper.toResponse(p);
  }
}
