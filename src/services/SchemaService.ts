import { SqlSchema } from "../models/Schemas/SqlSchema";
import { executeQuery } from "./SqlQuery";
import { Schema } from "../models/Schemas/Schema";


const getSchemas = async () => {
    const schemas = executeQuery<SqlSchema, Schema>(`SELECT * FROM INFORMATION_SCHEMA.SCHEMATA`, e => {
        const s: Schema = {
            name: e.SCHEMA_NAME
        };
        return s;
    });
    return schemas;
};

export { getSchemas };
