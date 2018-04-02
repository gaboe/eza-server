import { App } from "../models/Apps/App";
import { ObjectId } from "mongodb";
import { getQueryResult } from "./SqlQuery";
import { TableQueryResponse } from "../models/Tables/TableQueryResponse";
import { PageTableColumn } from "../models/Apps/Page";
import { ColumnInput } from "../models/Columns/ColumnInput";

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
            const res = await getQueryResult(page.table.columns);
            const response: TableQueryResponse = {
                rows: res
            };
            return response;
        }
    }
    return null;
};


const getTableQueryPreview = async (columns: ColumnInput[]) => {
    const res = await getQueryResult(columns.map(x => {
        const c: PageTableColumn = {
            dbColumn: x.name,
            dbDataType: x.dataType,
            table: {
                isPrimary: x.table.isPrimary,
                dbSchemaName: x.table.schemaName,
                dbTableName: x.table.tableName,
            }
        };
        return c;
    }));
    const response: TableQueryResponse = {
        rows: res
    };
    return response;

};
export { getTableQueryResponse, getTableQueryPreview };