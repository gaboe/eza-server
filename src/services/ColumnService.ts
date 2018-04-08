import { executeQuery } from "./SqlQuery";
import { MsSqlColumn } from "../models/mssql/models/Columns/MsSqlColumn";

const getColumnsByTableName = (tableName: string) => {
    console.log(getQuery(tableName));
    const columns = executeQuery<MsSqlColumn, DbColumn>(getQuery(tableName),
        e => {
            const column: DbColumn = {
                name: e.COLUMN_NAME,
                schemaName: e.TABLE_SCHEMA,
                tableName: e.TABLE_NAME,
                dataType: e.DATA_TYPE,
                position: e.ORDINAL_POSITION,
                isKey: e.IsKey
            };
            return column;
        });
    return columns;
};


const getQuery = (tableName: string) => `
SELECT [TABLE_SCHEMA], [TABLE_NAME], [COLUMN_NAME],  CAST(
    CASE WHEN EXISTS(SELECT i.name AS IndexName, OBJECT_NAME(ic.OBJECT_ID) AS TableName,
        COL_NAME(ic.OBJECT_ID,ic.column_id) AS ColumnName, s.name AS [SchemaName]
 FROM sys.indexes AS i
 INNER JOIN sys.index_columns AS ic
 ON i.OBJECT_ID = ic.OBJECT_ID
 AND i.index_id = ic.index_id
 join sys.objects o on o.object_id = ic.object_id
 inner join sys.schemas s on o.schema_id=s.schema_id

 WHERE i.is_primary_key = 1 AND s.name = [TABLE_SCHEMA] AND OBJECT_NAME(ic.OBJECT_ID) = [TABLE_NAME] AND  COL_NAME(ic.OBJECT_ID,ic.column_id) = [COLUMN_NAME])
  THEN 1
    ELSE 0
    END
 AS BIT) AS IsKey  FROM INFORMATION_SCHEMA.COLUMNS

 WHERE [TABLE_NAME] = '${tableName}'
`;

export { getColumnsByTableName };