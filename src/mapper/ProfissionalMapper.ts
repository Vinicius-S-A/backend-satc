// CAMADA: Mapper
// RESPONSABILIDADE: converter ProfissionalRequestDTO em Profissional e Profissional em ProfissionalResponseDTO.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: as de /profissionais.
// SITUAÇÃO: implementado.
import { ProfissionalRequestDTO } from "../dto/ProfissionalRequestDTO";
import { ProfissionalResponseDTO } from "../dto/ProfissionalResponseDTO";
import { Profissional } from "../model/Profissional";

export class ProfissionalMapper {
  toEntity(dto: ProfissionalRequestDTO): Profissional {
    const p = new Profissional();
    p.nome = dto.nome;
    p.especialidade = dto.especialidade;
    p.telefone = dto.telefone ?? null;
    p.email = dto.email ?? null;
    p.horaInicio = dto.horaInicio;
    p.horaFim = dto.horaFim;
    p.diasAtendimento = [...new Set(dto.diasAtendimento)].sort((a, b) => a - b).join(",");
    return p;
  }

  toResponse(p: Profissional): ProfissionalResponseDTO {
    return {
      id: p.id,
      nome: p.nome,
      especialidade: p.especialidade,
      telefone: p.telefone,
      email: p.email,
      horaInicio: p.horaInicio.slice(0, 5),
      horaFim: p.horaFim.slice(0, 5),
      diasAtendimento: p.diasAtendimento.split(",").map(Number)
    };
  }
}
