import { executeQuery } from "./SqlQuery";
import { SqlTable } from "../models/mssql/models/Tables/MsSqlTable";
import { DbTable } from "../models/db/Tables/DbTable";

const getTablesBySchema = (schema: string) => {
    const tables = executeQuery<SqlTable, DbTable>(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${schema}'`, e => {
        const table: DbTable = {
            name: e.TABLE_NAME,
            schemaName: e.TABLE_SCHEMA
        };
        return table;
    });
    return tables;
};

const getTable = async (tableName: string) => {
    const tables = await executeQuery<SqlTable, DbTable>(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`, e => {
        const table: DbTable = {
            name: e.TABLE_NAME,
            schemaName: e.TABLE_SCHEMA
        };
        return table;
    });
    return tables.length === 0 ? null : tables[0];
};

export { getTablesBySchema, getTable };