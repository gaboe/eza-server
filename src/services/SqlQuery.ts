import { Table } from "../models/app/Tables/Table";
import { find } from "ramda";
import { isNotNullOrUndefined } from "../utils/Utils";
import { ResponseRow, ResponseColumn } from "../models/app/Tables/TableQueryResponse";

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

type TableInQuery = {
    schema: string;
    name: string;
    alias: string;
    isPrimary: boolean;
    join?: string;
};

type ColumnInQuery = {
    rawSql: string;
    table: TableInQuery;
    name: string;
};

const getTablesInQuery = (table: Table) => {

    const foreignTables = table.columns
        .filter(x => x.reference !== undefined)
        .map((x, i) => {
            if (x.reference) {
                const alias = `[T${i + 1}]`;
                const t: TableInQuery = {
                    schema: x.schemaName,
                    name: x.tableName,
                    isPrimary: false,
                    alias: alias,
                    join: `${x.reference.type} ${x.schemaName}.${x.tableName} ${alias} ON ${alias}.${x.columnName} = [T0].${x.reference.primaryKey}`
                };
                return t;
            }
            return null;
        })
        .filter(isNotNullOrUndefined);

    return foreignTables;
};

const getColumnsInQuery = (foreignTables: TableInQuery[], primaryTable: Table) => {
    const cols = primaryTable.columns
        .filter(x => !isNotNullOrUndefined(x.reference))
        .map(column => {
            const table = find(x => x.schema === column.schemaName && x.name === column.tableName, foreignTables);
            if (table) {
                const c: ColumnInQuery = {
                    table: table,
                    rawSql: `${table.alias}.${column.columnName}`,
                    name: column.columnName
                };
                return c;
            }
            const primaryColumn: ColumnInQuery = {
                table: { alias: "[T0]", isPrimary: true, name: primaryTable.tableName, schema: primaryTable.schemaName },
                rawSql: `[T0].${column.columnName}`,
                name: column.columnName,
            };
            return primaryColumn;
        });
    return cols;
};

const getQueryResult = async (table: Table) => {
    const tables = getTablesInQuery(table);
    const cols = getColumnsInQuery(tables, table);

    const query = `SELECT\n${cols.map(x => x.rawSql).join(",\n")}\n FROM ${table.schemaName}.${table.tableName} [T0]
                ${tables.map(x => x.join).join("\n")}
                `;

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