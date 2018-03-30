const sql = require("mssql");
import { connect } from "./SqlConfigService";
import { SqlSchema } from "../models/Schemas/SqlSchema";
import { Schema } from "../models/Schemas/Schema";


const getSchemas = async () => {
    await connect();
    const result: SqlResponse<SqlSchema> = await sql.query`SELECT * FROM INFORMATION_SCHEMA.SCHEMATA`;
    const schemas: Schema[] = result.recordset.map(e => {
        const s: Schema = { name: e.SCHEMA_NAME };
        return s;
    });
    return schemas;
};

export { getSchemas };
