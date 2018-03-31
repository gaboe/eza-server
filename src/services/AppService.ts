import { App, IApp } from "../models/Apps/App";


const createApp = () => {
    const a: IApp = {
        description: { name: "TEST" },
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