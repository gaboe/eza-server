import { Schema } from "mongoose";

type Column = {
    id?: string;
    columnName: string;
    tableName: string;
    schemaName: string;
    isFromPrimaryTable: boolean;
    isKey: boolean;
    reference?: Reference;
};

type Reference = {
    primaryKey: string;
    type: string;
};

const referenceSchema = new Schema({
    primaryKey: String,
    type: String,
});

const columnSchema = new Schema({
    columnName: String,
    tableName: String,
    schemaName: String,
    isFromPrimaryTable: Boolean,
    isKey: Boolean,
    reference: referenceSchema
});

export { Column, columnSchema, Reference };
