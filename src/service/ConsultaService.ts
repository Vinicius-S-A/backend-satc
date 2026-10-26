// CAMADA: Service
// RESPONSABILIDADE: agendamento de consultas; coordena Mapper e Repositories.
// REGRAS: R1 (profissional não pode ter duas consultas no mesmo horário),
//         R2 (a consulta deve respeitar a duração e a disponibilidade do profissional) e
//         R3 (paciente não pode agendar duas consultas no mesmo horário).
// ROTAS ATENDIDAS: as de /consultas em docs/contrato-da-api.md.
// SITUAÇÃO: implementada.
import { ConsultaRequestDTO } from "../dto/ConsultaRequestDTO";
import { ConsultaResponseDTO } from "../dto/ConsultaResponseDTO";
import { ConsultaMapper } from "../mapper/ConsultaMapper";
import { Profissional } from "../model/Profissional";
import { ConsultaRepository } from "../repository/ConsultaRepository";
import { PacienteRepository } from "../repository/PacienteRepository";
import { ProfissionalRepository } from "../repository/ProfissionalRepository";
import { ConsultaNaoEncontradaException } from "./exceptions/ConsultaNaoEncontradaException";
import { PacienteNaoEncontradoException } from "./exceptions/PacienteNaoEncontradoException";
import { ProfissionalNaoEncontradoException } from "./exceptions/ProfissionalNaoEncontradoException";
import { RegraDeNegocioException } from "./exceptions/RegraDeNegocioException";

const DIAS = ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"];

export class ConsultaService {
  constructor(
    private readonly repository: ConsultaRepository,
    private readonly mapper: ConsultaMapper,
    private readonly pacienteRepository: PacienteRepository,
    private readonly profissionalRepository: ProfissionalRepository
  ) {}

  async criar(dto: ConsultaRequestDTO): Promise<ConsultaResponseDTO> {
    const paciente = await this.pacienteRepository.findById(dto.pacienteId);
    if (!paciente) throw new PacienteNaoEncontradoException(dto.pacienteId);
    const profissional = await this.profissionalRepository.findById(dto.profissionalId);
    if (!profissional) throw new ProfissionalNaoEncontradoException(dto.profissionalId);

    const inicio = dto.dataHora;
    const fim = new Date(inicio.getTime() + dto.duracaoMinutos * 60_000);

    // R2: duração e disponibilidade do profissional
    this.validarDisponibilidade(profissional, inicio, dto.duracaoMinutos);

    // R1: o profissional não pode ter duas consultas no mesmo horário
    if (await this.repository.existsConflitoDoProfissional(profissional.id, inicio, fim)) {
      throw new RegraDeNegocioException("R1: o profissional já tem uma consulta agendada que coincide com este horário");
    }

    // R3: o paciente não pode agendar duas consultas no mesmo horário
    if (await this.repository.existsConflitoDoPaciente(paciente.id, inicio, fim)) {
      throw new RegraDeNegocioException("R3: o paciente já tem uma consulta agendada que coincide com este horário");
    }

    const salva = await this.repository.save(this.mapper.toEntity(dto, paciente, profissional));
    return this.mapper.toResponse(salva);
  }

  async listar(): Promise<ConsultaResponseDTO[]> {
    return (await this.repository.findAll()).map((c) => this.mapper.toResponse(c));
  }

  async buscarPorId(id: number): Promise<ConsultaResponseDTO> {
    const c = await this.repository.findById(id);
    if (!c) throw new ConsultaNaoEncontradaException(id);
    return this.mapper.toResponse(c);
  }

  // R2: o dia precisa ser de atendimento e a consulta inteira (início + duração) cabe no expediente.
  private validarDisponibilidade(p: Profissional, inicio: Date, duracaoMinutos: number): void {
    const dias = p.diasAtendimento.split(",").map(Number);
    if (!dias.includes(inicio.getDay())) {
      throw new RegraDeNegocioException(`R2: o profissional não atende na ${DIAS[inicio.getDay()]}`);
    }
    const minutos = (hhmm: string) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5));
    const ini = inicio.getHours() * 60 + inicio.getMinutes();
    if (ini < minutos(p.horaInicio) || ini + duracaoMinutos > minutos(p.horaFim)) {
      throw new RegraDeNegocioException(
        `R2: a consulta (início + duração) deve caber no expediente do profissional, das ${p.horaInicio.slice(0, 5)} às ${p.horaFim.slice(0, 5)}`
      );
    }
  }
}
