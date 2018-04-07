import { Column, columnSchema } from "../Columns/Column";
import { Schema } from "mongoose";

type Table = {
    id?: string,
    schemaName: string;
    tableName: string;
    columns: Column[];
};

const tableSchema = new Schema({
    schemaName: String,
    tableName: String,
    columns: [columnSchema]
});

export { Table, tableSchema };