import { Schema } from "mongoose";
import { Table, tableSchema } from "../Tables/Table";

type Page = {
    cid: string,
    name: string,
    table: Table
};

const pageSchema = new Schema({
    cid: String,
    name: String,
    table: tableSchema
});

export { Page, pageSchema };