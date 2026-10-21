// CAMADA: Controller (apoio)
// RESPONSABILIDADE: valida o corpo/parâmetro com o schema do DTO. Se inválido, lança ValidacaoException (vira 400).
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: todas que recebem corpo ou {id}.
// SITUAÇÃO: implementada.
import { z, ZodTypeAny } from "zod";
import { CampoErroDTO } from "../dto/ErroDTO";

export class ValidacaoException extends Error {
  constructor(public readonly campos: CampoErroDTO[]) {
    super("Requisição inválida");
  }
}

export function validar<T extends ZodTypeAny>(schema: T, dado: unknown): z.infer<T> {
  const r = schema.safeParse(dado ?? {});
  if (!r.success) {
    throw new ValidacaoException(
      r.error.issues.map((i) => ({ campo: i.path.join(".") || "(corpo)", mensagem: i.message }))
    );
  }
  return r.data;
}

export const IdSchema = z.coerce.number({ invalid_type_error: "id deve ser um número" }).int().positive("id deve ser positivo");
