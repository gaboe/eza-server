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

export { getTablesBySchema };