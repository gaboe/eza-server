import { App, IApp } from "../models/Apps/App";
import * as shortid from "shortid";
import { Page, PageTableColumn } from "../models/Apps/Page";
import { MenuItem } from "../models/Apps/MenuItem";
import { maxBy } from "lodash";
import { append } from "ramda";
const getTestCid = () => {
    const cid = process.env.CID;
    if (cid) {
        return cid;
    }
    throw new Error("cid not found");
};

const createApp = () => {
    const cid = shortid.generate();
    const a: IApp = {
        cid: cid,
        description: { name: `app-${cid}` },
        menuItems: [],
        pages: []
    };
    App.create(a);
    return a;
};

const addPage = async (columns: Column[], pageName: string) => {
    const app = await getAppByCid(getTestCid());
    if (app) {
        const page: Page = {
            name: pageName,
            table: {
                columns: columns.map(x => {
                    const col: PageTableColumn = {
                        dbSchema: x.schemaName,
                        dbTable: x.tableName,
                        dbColumn: x.name,
                        dbDataType: x.dataType,
                    };
                    return col;
                })
            }
        };
        const maxElement = maxBy(app.menuItems, e => e.rank);
        const rank = maxElement && maxElement.rank || 0;

        const menuItem: MenuItem = {
            name: pageName,
            rank: rank + 1
        };

        app.pages = append(page, app.pages);
        app.menuItems = append(menuItem, app.menuItems);
        app.save();
        return app;
    }
    throw new Error;
};


const getAppByName = async (name: string) => {
    const app = await App.findOne({ "description.name": name });
    return app;
};

const getAppByCid = async (cid: string) => {
    const app = App.findOne({ cid });
    return app;
};

export { createApp, getAppByName, addPage };