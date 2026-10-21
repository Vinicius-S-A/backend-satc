// CAMADA: Service
// RESPONSABILIDADE: regras de negócio das categorias; coordena Mapper e Repository.
// REGRAS: REGRA-EXEMPLO (não pode haver duas categorias com o mesmo nome).
//         >>> SUBSTITUA pelas regras do SEU tema: regra genérica não conta na avaliação (P8). <<<
// ROTAS ATENDIDAS: as de /categorias em docs/contrato-da-api.md.
// SITUAÇÃO: implementada.
import { CategoriaRequestDTO } from "../dto/CategoriaRequestDTO";
import { CategoriaResponseDTO } from "../dto/CategoriaResponseDTO";
import { CategoriaMapper } from "../mapper/CategoriaMapper";
import { CategoriaRepository } from "../repository/CategoriaRepository";
import { CategoriaNaoEncontradaException } from "./exceptions/CategoriaNaoEncontradaException";
import { RegraDeNegocioException } from "./exceptions/RegraDeNegocioException";

export class CategoriaService {
  constructor(
    private readonly repository: CategoriaRepository,
    private readonly mapper: CategoriaMapper
  ) {}

  async criar(dto: CategoriaRequestDTO): Promise<CategoriaResponseDTO> {
    if (await this.repository.existsByNome(dto.nome)) {
      throw new RegraDeNegocioException("REGRA-EXEMPLO: já existe uma categoria com este nome");
    }
    const salva = await this.repository.save(this.mapper.toEntity(dto));
    return this.mapper.toResponse(salva);
  }

  async listar(): Promise<CategoriaResponseDTO[]> {
    return (await this.repository.findAll()).map((c) => this.mapper.toResponse(c));
  }

  async buscarPorId(id: number): Promise<CategoriaResponseDTO> {
    const c = await this.repository.findById(id);
    if (!c) throw new CategoriaNaoEncontradaException(id);
    return this.mapper.toResponse(c);
  }
}
