import { Schema } from "mongoose";

type Page = {
    cid: string,
    name: string,
    table: PageTable
};
type PageTable = {
    id?: string,
    columns: PageTableColumn[],
};

type PageTableColumnTable = {
    dbSchemaName: string;
    dbTableName: string;
    isPrimary: boolean;
};


const pageTableColumnTableSchema = new Schema({
    dbSchemaName: String,
    dbTableName: String,
    isPrimary: Boolean,
});

type PageTableColumn = {
    dbColumn: string;
    dbDataType: string;
    table: PageTableColumnTable;
};

const pageTableColumnSchema = new Schema({
    dbColumn: String,
    dbDataType: String,
    table: pageTableColumnTableSchema
});

const pageTableSchema = new Schema({
    columns: [pageTableColumnSchema]
});

const pageSchema = new Schema({
    cid: String,
    name: String,
    table: pageTableSchema
});

export { Page, PageTableColumn, PageTable, pageSchema, PageTableColumnTable };