import { App } from "../models/app/Apps/App";
import { ObjectId } from "mongodb";
import { getQueryResult } from "./SqlQuery";
import { Table } from "../models/app/Tables/Table";
import { TableQueryResponse } from "../models/app/Tables/TableQueryResponse";

const getTableQueryResponse = async (tableID: string) => {
    const app = await App.findOne({ "pages.table._id": new ObjectId(tableID) });
    if (app) {
        const page = app.pages.find(x => {
            if (!x.table.id) {
                return false;
            }
            return x.table.id === tableID;
        }
        );
        if (page) {
            const res = await getQueryResult(page.table);
            const response: TableQueryResponse = {
                rows: res
            };
            return response;
        }
    }
    return null;
};


const getTableQueryPreview = async (table: Table) => {
    const res = await getQueryResult(table);
    const response: TableQueryResponse = {
        rows: res
    };
    return response;

};
export { getTableQueryResponse, getTableQueryPreview };