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

type PageTableColumn = {
    dbSchema: string,
    dbTable: string,
    dbColumn: string,
    dbDataType: string,
};

const pageTableColumnSchema = new Schema({
    dbSchema: String,
    dbTable: String,
    dbColumn: String,
    dbDataType: String,
});

const pageTableSchema = new Schema({
    columns: [pageTableColumnSchema]
});

const pageSchema = new Schema({
    cid: String,
    name: String,
    table: pageTableSchema
});

export { Page, PageTableColumn, PageTable, pageSchema };