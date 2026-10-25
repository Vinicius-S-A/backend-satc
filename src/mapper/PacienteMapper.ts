
 // CAMADA: Mapper
 // RESPONSABILIDADE: converter DTOs de pacientes para a entidade e vice-versa.
 // REGRAS: nenhuma; conversão de dados.
 // ROTAS ATENDIDAS: utilizada pelas rotas de pacientes.
 // SITUAÇÃO: implementada.

import { PacienteRequestDTO } from "../dto/PacienteRequestDTO";
import { PacienteResponseDTO } from "../dto/PacienteResponseDTO";
import { Paciente } from "../model/Paciente";

export class PacienteMapper {
  toEntity(dto: PacienteRequestDTO): Paciente {
    const paciente = new Paciente();

    paciente.nome = dto.nome;
    paciente.cpf = dto.cpf;
    paciente.telefone = dto.telefone ?? null;
    paciente.email = dto.email ?? null;

    return paciente;
  }

  toResponse(paciente: Paciente): PacienteResponseDTO {
    return {
      id: paciente.id,
      nome: paciente.nome,
      cpf: paciente.cpf,
      telefone: paciente.telefone,
      email: paciente.email
    };
  }
}
