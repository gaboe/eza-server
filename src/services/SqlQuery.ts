import { PageTableColumn, PageTableColumnTable } from "../models/app/Pages/Page";
import { ResponseRow, ResponseColumn } from "../models/app/Tables/TableQueryResponse";
import { groupBy, find } from "ramda";
import { orderBy } from "lodash";
import { nameof } from "../utils/Utils";
import { getReferencedContstraints } from "./ReferenceConstraintService";

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
};

type ColumnInQuery = {
    rawSql: string;
    table: TableInQuery;
    name: string;
};

const getTablesInQuery = (columns: PageTableColumn[]) => {
    const tablesGrouped = groupBy(x => x.table.dbTableName,
        orderBy(columns, [nameof<PageTableColumn>("table"), nameof<PageTableColumnTable>("isPrimary")], "asc"));

    const tables = Object.keys(tablesGrouped).map((tableName, index) => {
        const firstCol = find(e => e.table.dbTableName === tableName, columns);
        if (firstCol) {
            const table: TableInQuery = {
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

const getColumnsInQuery = (tables: TableInQuery[], columns: PageTableColumn[]) => {
    const cols = columns.map(column => {
        const table = find(x => x.name === column.table.dbTableName, tables);
        if (table) {
            const c: ColumnInQuery = {
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
    throw new Error(`nothing found by ${fn} on list: ${list}`);
};

const getQueryResult = async (columns: PageTableColumn[]) => {
    const tables = getTablesInQuery(columns);
    console.log(":tables", tables);
    const cols = getColumnsInQuery(tables, columns);
    const primaryTable = strictFind(x => x.isPrimary, tables);
    const joins = await buildJoins(tables);
    const query = `${buildQuery(cols, primaryTable)}
                ${joins}
                `;

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

const buildJoins = async (tables: TableInQuery[]) => {
    const primaryTable = strictFind(x => x.isPrimary, tables);
    const referencedConstrains = await getReferencedContstraints(primaryTable.name);
    const query = tables
        .filter(x => !x.isPrimary)
        .map(x => {
            const reference = strictFind(r => r.referencedTableName === x.name, referencedConstrains);

            const join = `JOIN ${x.schema}.${x.name} ${x.alias} ON ${x.alias}.${reference.referencingColumnName} = ${primaryTable.alias}.${reference.referencedColumnName}`;
            return join;
        });
    return query.join("\n");
};

const buildQuery = (columns: ColumnInQuery[], primaryTable: TableInQuery) => {
    return `SELECT ${columns.map(x => x.rawSql)} FROM ${primaryTable.schema}.${primaryTable.name} ${primaryTable.alias}`;
};

export { executeQuery, getQueryResult };