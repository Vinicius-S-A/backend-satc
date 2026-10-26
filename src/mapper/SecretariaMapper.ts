// CAMADA: Mapper
// RESPONSABILIDADE: converter SecretariaRequestDTO em Secretaria e Secretaria em SecretariaResponseDTO
//                   (a resposta nunca leva a senha). A senha recebida chega aqui já em hash.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: as de /secretarias.
// SITUAÇÃO: implementado.
import { SecretariaRequestDTO } from "../dto/SecretariaRequestDTO";
import { SecretariaResponseDTO } from "../dto/SecretariaResponseDTO";
import { Secretaria } from "../model/Secretaria";

export class SecretariaMapper {
  toEntity(dto: SecretariaRequestDTO): Secretaria {
    const s = new Secretaria();
    s.nome = dto.nome;
    s.cpf = dto.cpf;
    s.telefone = dto.telefone ?? null;
    s.email = dto.email ?? null;
    s.login = dto.login;
    s.senha = dto.senha;
    return s;
  }

  toResponse(s: Secretaria): SecretariaResponseDTO {
    return { id: s.id, nome: s.nome, cpf: s.cpf, telefone: s.telefone, email: s.email, login: s.login };
  }
}
