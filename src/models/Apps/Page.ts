import { Schema } from "mongoose";

type Page = {
    name: string,
    table: PageTable
};
type PageTable = {
    columns: PageTableColumn[],
};

type PageTableColumn = {
    dbSchema: string,
    table: string,
    column: string
};
const pageTableColumnSchema = new Schema({
    dbSchema: String,
    table: String,
    column: String
});

const pageTableSchema = new Schema({
    columns: [pageTableColumnSchema]
});

const pageSchema = new Schema({
    name: String,
    table: pageTableSchema
});

export { Page, PageTableColumn, PageTable, pageSchema };