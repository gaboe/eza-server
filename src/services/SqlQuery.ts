import { PageTableColumn, PageTableColumnTable } from "../models/Apps/Page";
import { ResponseRow, ResponseColumn } from "../models/Tables/TableQueryResponse";
import { groupBy, find } from "ramda";
import { orderBy } from "lodash";
import { nameof } from "../utils/Utils";

const sql = require("mssql");

const executeQuery = async<From, To>(query: string, map: (sqlEntity: From) => To) => {
    const pool = new sql.ConnectionPool("mssql://app:123@localhost/eza");
    await pool.connect();

    const result: SqlResponse<From> = await pool
        .request()
        .query(query);

    const schemas: To[] = result.recordset.map(e => map(e));

    return schemas;

};

type TableQueryType = {
    schema: string;
    name: string;
    alias: string;
    isPrimary: boolean;
};

type ColumnQueryType = {
    rawSql: string;
    table: TableQueryType;
    name: string;
};

const getTableQueryTypes = (columns: PageTableColumn[]) => {
    const tablesGrouped = groupBy(x => x.table.dbTableName,
        orderBy(columns, [nameof<PageTableColumn>("table"), nameof<PageTableColumnTable>("isPrimary")], "asc"));

    const tables = Object.keys(tablesGrouped).map((tableName, index) => {
        const firstCol = find(e => e.table.dbTableName === tableName, columns);
        if (firstCol) {
            const table: TableQueryType = {
                isPrimary: firstCol.table.isPrimary,
                name: firstCol.table.dbTableName,
                schema: firstCol.table.dbSchemaName,
                alias: `[T${index}]`
            };
            return table;
        }
        throw new Error();
    });
    return tables;
};

const getColumnQueryTypes = (tables: TableQueryType[], columns: PageTableColumn[]) => {
    const cols = columns.map(column => {
        const table = find(x => x.name === column.table.dbTableName, tables);
        if (table) {
            const c: ColumnQueryType = {
                table: table,
                rawSql: `${table.alias}.${column.dbColumn}`,
                name: column.dbColumn
            };
            return c;
        }
        throw new Error();
    });
    return cols;
};

const strictFind = <T>(fn: (a: T) => boolean, list: ReadonlyArray<T>): T => {
    const value = find(fn, list);
    if (value) {
        return value;
    }
    throw new Error();
};

const getQueryResult = async (columns: PageTableColumn[]) => {
    const tables = getTableQueryTypes(columns);
    const cols = getColumnQueryTypes(tables, columns);
    console.log(cols);
    const table = "Users";
    const schema = "dbo";
    const columnNames = columns.map(x => x.dbColumn).join(",");

    const p = strictFind(x => x.isPrimary, tables);
    const pc = strictFind(x => x.table.name === p.name, cols);

    const ccc = strictFind(x => x.table.name === tables[1].name, cols);

    const query = `SELECT ${cols.map(x => x.rawSql)} FROM ${p.schema}.${p.name} ${p.alias}
                JOIN ${tables[1].schema}.${tables[1].name} ${tables[1].alias} ON  ${tables[1].alias}.${ccc.name} = ${p.alias}.${pc.name} `;
    console.log(query);

    const pool = new sql.ConnectionPool("mssql://app:123@localhost/eza");
    await pool.connect();

    // tslint:disable-next-line:no-any
    const result: SqlResponse<any> = await pool
        .request()
        .query(query);

    const responseRow = result.recordset.map(record => {
        const row: ResponseRow = {
            key: record[Object.keys(record)[0]],
            columns: Object.keys(record).map(key => {
                const column: ResponseColumn = {
                    columnName: key,
                    value: record[key]
                };
                return column;
            })
        };
        return row;
    });
    return responseRow;
};
export { executeQuery, getQueryResult };