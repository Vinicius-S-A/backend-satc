// CAMADA: Service
// RESPONSABILIDADE: casos de uso das secretárias;
// REGRAS: CPF único e login único (400 se já existir).
// ROTAS ATENDIDAS: as de /secretarias em docs/contrato-da-api.md.
// SITUAÇÃO: implementada.
import { SecretariaRequestDTO } from "../dto/SecretariaRequestDTO";
import { SecretariaResponseDTO } from "../dto/SecretariaResponseDTO";
import { SecretariaMapper } from "../mapper/SecretariaMapper";
import { SecretariaRepository } from "../repository/SecretariaRepository";
import { RegraDeNegocioException } from "./exceptions/RegraDeNegocioException";
import { SecretariaNaoEncontradaException } from "./exceptions/SecretariaNaoEncontradaException";

export class SecretariaService {
  constructor(
    private readonly repository: SecretariaRepository,
    private readonly mapper: SecretariaMapper
  ) {}

  async criar(dto: SecretariaRequestDTO): Promise<SecretariaResponseDTO> {
    if (await this.repository.existsByCpf(dto.cpf)) {
      throw new RegraDeNegocioException("Já existe uma secretária cadastrada com este CPF");
    }
    if (await this.repository.existsByLogin(dto.login)) {
      throw new RegraDeNegocioException("Já existe uma secretária cadastrada com este login");
    }
    const salva = await this.repository.save(this.mapper.toEntity(dto));
    return this.mapper.toResponse(salva);
  }

  async listar(): Promise<SecretariaResponseDTO[]> {
    return (await this.repository.findAll()).map((s) => this.mapper.toResponse(s));
  }

  async buscarPorId(id: number): Promise<SecretariaResponseDTO> {
    const s = await this.repository.findById(id);
    if (!s) throw new SecretariaNaoEncontradaException(id);
    return this.mapper.toResponse(s);
  }
}
