import { App, IApp } from "../models/Apps/App";
import * as shortid from "shortid";

const createApp = () => {
    const a: IApp = {
        description: { name: `app-${shortid.generate()}` },
        menuItems: [{ name: "menuItemTest", order: 0 }],
        pages: [{
            name: "page0",
            table: {
                columns: [{ column: "UserID", table: "Users", dbSchema: "dbo" }]
            }
        }]
    };
    App.create(a);
};


const getAppByName = async (name: string) => {
    const app = await App.findOne({ "description.name": name });
    return app;
};

export { createApp, getAppByName };