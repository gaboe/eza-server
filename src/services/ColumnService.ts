import { executeQuery } from "./SqlQuery";

const getColumnsByTableName = (tableName: string) => {
    const columns = executeQuery<SqlColumn, Column>(`SELECT * FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = '${tableName}'`,
        e => {
            const column: Column = {
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