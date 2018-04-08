import { App, IApp } from "../models/app/Apps/App";
import * as shortid from "shortid";
import { Page } from "../models/app/Pages/Page";
import { MenuItem } from "../models/app/MenuItems/MenuItem";
import { maxBy } from "lodash";
import { append, prepend } from "ramda";
import { Table } from "../models/app/Tables/Table";

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

const addPage = async (table: Table, pageName: string) => {
    const app = await getAppPreview(table, pageName);
    app.save();
    return app.pages[0];
};

const getAppByName = async (name: string) => {
    const app = await App.findOne({ "description.name": name });
    return app;
};

const getAppByCid = async (cid: string) => {
    const app = App.findOne({ cid });
    return app;
};

const getAppPreview = async (table: Table, pageName: string) => {
    const app = await getAppByCid(getTestCid());
    if (app) {
        const page: Page = {
            cid: shortid.generate(),
            name: pageName,
            table: table
        };
        const maxElement = maxBy(app.menuItems, e => e.rank);
        const rank = maxElement && maxElement.rank || 0;

        const menuItem: MenuItem = {
            pageCid: page.cid,
            name: pageName,
            rank: rank + 1
        };

        app.pages = prepend(page, app.pages);
        app.menuItems = append(menuItem, app.menuItems);
        return app;
    }
    throw new Error;
};

export { createApp, getAppByName, addPage, getAppByCid, getAppPreview };