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
export { executeQuery };