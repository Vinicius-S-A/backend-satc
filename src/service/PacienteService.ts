
 // CAMADA: Service
 // RESPONSABILIDADE: coordenar as operações e aplicar regras de negócio dos pacientes.
 // REGRAS: não permitir dois pacientes com o mesmo CPF.
 // ROTAS ATENDIDAS: rotas de /pacientes.
 // SITUAÇÃO: implementada.

import { PacienteRequestDTO } from "../dto/PacienteRequestDTO";
import { PacienteResponseDTO } from "../dto/PacienteResponseDTO";
import { PacienteMapper } from "../mapper/PacienteMapper";
import { PacienteRepository } from "../repository/PacienteRepository";
import { RegraDeNegocioException } from "./exceptions/RegraDeNegocioException";
import { RecursoNaoEncontradoException } from "./exceptions/RecursoNaoEncontradoException";

export class PacienteService {
  constructor(
    private readonly repository: PacienteRepository,
    private readonly mapper: PacienteMapper
  ) {}

  async criar(dto: PacienteRequestDTO): Promise<PacienteResponseDTO> {
    const cpf = dto.cpf.trim();

    if (await this.repository.existsByCpf(cpf)) {
      throw new RegraDeNegocioException(
        "Já existe um paciente cadastrado com este CPF"
      );
    }

    const paciente = this.mapper.toEntity({
      ...dto,
      cpf
    });

    const salvo = await this.repository.save(paciente);
    return this.mapper.toResponse(salvo);
  }

  async listar(): Promise<PacienteResponseDTO[]> {
    const pacientes = await this.repository.findAll();
    return pacientes.map((paciente) => this.mapper.toResponse(paciente));
  }

  async buscarPorId(id: number): Promise<PacienteResponseDTO> {
    const paciente = await this.repository.findById(id);

    if (!paciente) {
  throw new RecursoNaoEncontradoException(
    `Paciente com ID ${id} não encontrado`
  );
}

    return this.mapper.toResponse(paciente);
  }
}
