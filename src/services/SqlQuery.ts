import { connect, close } from "./SqlConfigService";

const executeQuery = async<From, To>(query: string, map: (sqlEntity: From) => To) => {
    const pool = await connect();
    const result: SqlResponse<From> = await pool
        .request()
        .query(query);

    await close();
    const schemas: To[] = result.recordset.map(e => map(e));

    return schemas;

};
export { executeQuery };