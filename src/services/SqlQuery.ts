import { connect, close } from "./SqlConfigService";

const getSqlResult = async<From, To>(q: string, fn: (f: From) => To) => {
    const pool = await connect();
    const result: SqlResponse<From> = await pool
        .request()
        .query(q);

    await close();
    const schemas: To[] = result.recordset.map(e => fn(e));

    return schemas;

};
export { getSqlResult };