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

export { createApp };