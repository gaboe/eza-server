import { executeQuery } from "./SqlQuery";
import { MsSqlColumn } from "../models/mssql/models/Columns/MsSqlColumn";

const getColumnsByTableName = (tableName: string) => {
    const columns = executeQuery<MsSqlColumn, DbColumn>(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`,
        e => {
            const column: DbColumn = {
                name: e.COLUMN_NAME,
                schemaName: e.TABLE_SCHEMA,
                tableName: e.TABLE_NAME,
                dataType: e.DATA_TYPE,
                position: e.ORDINAL_POSITION
            };
            return column;
        });
    return columns;
};


export { getColumnsByTableName };