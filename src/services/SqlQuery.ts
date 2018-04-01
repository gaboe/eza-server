import { PageTableColumn } from "../models/Apps/Page";
import { ResponseRow, ResponseColumn } from "../models/Tables/TableQueryResponse";

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


const getQueryResult = async (columns: PageTableColumn[]) => {
    const table = columns[0].dbTable;
    const schema = columns[0].dbSchema;
    const columnNames = columns.map(x => x.dbColumn).join(",");

    const query = `SELECT ${columnNames} FROM ${schema}.${table}`;

    const pool = new sql.ConnectionPool("mssql://app:123@localhost/eza");
    await pool.connect();

    // tslint:disable-next-line:no-any
    const result: SqlResponse<any> = await pool
        .request()
        .query(query);

    console.log(result.recordset);
    const responseRow = result.recordset.map(record => {
        const row: ResponseRow = {
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