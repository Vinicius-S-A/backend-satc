// CAMADA: Config
// RESPONSABILIDADE: equivalente ao `ddl-auto=validate` do Hibernate. Confere, na subida,
//                   se cada @Entity tem a tabela e as colunas criadas pelas migrations.
// REGRAS: nenhuma.
// ROTAS ATENDIDAS: nenhuma.
// SITUAÇÃO: implementada.
import { DataSource } from "typeorm";

export async function validarEntidadesContraBanco(ds: DataSource): Promise<void> {
  for (const meta of ds.entityMetadatas) {
    const linhas: { column_name: string }[] = await ds.query(
      "SELECT column_name FROM information_schema.columns WHERE table_name = $1",
      [meta.tableName]
    );
    const noBanco = new Set(linhas.map((l) => l.column_name));
    if (noBanco.size === 0) {
      throw new Error(`Tabela '${meta.tableName}' da entidade ${meta.name} não existe no banco`);
    }
    for (const coluna of meta.columns) {
      if (!noBanco.has(coluna.databaseName)) {
        throw new Error(`Coluna '${coluna.databaseName}' da entidade ${meta.name} não existe na tabela '${meta.tableName}'`);
      }
    }
  }
}
