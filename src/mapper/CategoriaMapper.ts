// CAMADA: Mapper
// RESPONSABILIDADE: converter CategoriaRequestDTO em Categoria e Categoria em CategoriaResponseDTO.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: as de /categorias.
// SITUAÇÃO: implementado.
import { CategoriaRequestDTO } from "../dto/CategoriaRequestDTO";
import { CategoriaResponseDTO } from "../dto/CategoriaResponseDTO";
import { Categoria } from "../model/Categoria";

export class CategoriaMapper {
  toEntity(dto: CategoriaRequestDTO): Categoria {
    const c = new Categoria();
    c.nome = dto.nome;
    return c;
  }
  toResponse(c: Categoria): CategoriaResponseDTO {
    return { id: c.id, nome: c.nome };
  }
}
