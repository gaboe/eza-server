import { App } from "../models/Apps/App";
import { ObjectId } from "mongodb";
import { getQueryResult } from "./SqlQuery";
import { TableQueryResponse } from "../models/Tables/TableQueryResponse";

const getTableQueryResponse = async (tableID: string) => {
    const app = await App.findOne({ "pages.table._id": new ObjectId(tableID) });
    if (app) {
        const menuItem = app.pages.find(x => {
            if (!x.table.id) {
                return false;
            }
            return x.table.id === tableID;
        }
        );
        if (menuItem) {
            const res = await getQueryResult(menuItem.table.columns);
            const response: TableQueryResponse = {
                rows: res
            };
            return response;
        }
    }
    return null;
};

export { getTableQueryResponse };