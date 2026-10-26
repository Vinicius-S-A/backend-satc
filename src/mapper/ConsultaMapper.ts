// CAMADA: Mapper
// RESPONSABILIDADE: converter ConsultaRequestDTO em Consulta e Consulta em ConsultaResponseDTO.
//                   Paciente e Profissional já chegam carregados pelo Service.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: as de /consultas.
// SITUAÇÃO: implementado.
import { ConsultaRequestDTO } from "../dto/ConsultaRequestDTO";
import { ConsultaResponseDTO } from "../dto/ConsultaResponseDTO";
import { Consulta } from "../model/Consulta";
import { Paciente } from "../model/Paciente";
import { Profissional } from "../model/Profissional";

export class ConsultaMapper {
  toEntity(dto: ConsultaRequestDTO, paciente: Paciente, profissional: Profissional): Consulta {
    const c = new Consulta();
    c.paciente = paciente;
    c.profissional = profissional;
    c.dataHora = dto.dataHora;
    c.duracaoMinutos = dto.duracaoMinutos;
    c.status = "agendada";
    return c;
  }

  toResponse(c: Consulta): ConsultaResponseDTO {
    return {
      id: c.id,
      pacienteId: c.paciente.id,
      profissionalId: c.profissional.id,
      dataHora: c.dataHora.toISOString(),
      duracaoMinutos: c.duracaoMinutos,
      status: c.status
    };
  }
}
