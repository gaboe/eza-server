import { executeQuery } from "./SqlQuery";
import { SqlTable } from "../models/Tables/SqlTable";
import { Table } from "../models/Tables/Table";

const getTablesBySchema = (schema: string) => {
    const tables = executeQuery<SqlTable, Table>(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_SCHEMA = '${schema}'`, e => {
        const table: Table = {
            name: e.TABLE_NAME,
            schemaName: e.TABLE_SCHEMA
        };
        return table;
    });
    return tables;
};

const getTable = async (tableName: string) => {
    const tables = await executeQuery<SqlTable, Table>(`SELECT * FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_NAME = '${tableName}'`, e => {
        const table: Table = {
            name: e.TABLE_NAME,
            schemaName: e.TABLE_SCHEMA
        };
        return table;
    });
    return tables.length === 0 ? null : tables[0];
};

export { getTablesBySchema, getTable };