import { SqlSchema } from "../models/mssql/models/Schemas/MsSqlSchema";
import { executeQuery } from "./SqlQuery";
import { DbSchema } from "../models/db/Schemas/DbSchema";


const getSchemas = async () => {
    const schemas = executeQuery<SqlSchema, DbSchema>(`SELECT * FROM INFORMATION_SCHEMA.SCHEMATA`, e => {
        const s: DbSchema = {
            name: e.SCHEMA_NAME
        };
        return s;
    });
    return schemas;
};

export { getSchemas };
