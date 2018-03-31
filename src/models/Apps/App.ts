import { Document, Schema, model } from "mongoose";
import { appDescriptionSchema, IAppDescription } from "./AppDescription";
import { MenuItem, menuItemsSchema } from "./MenuItem";
import { Page, pageSchema } from "./Page";

interface IApp {
    description: IAppDescription;
    menuItems: MenuItem[];
    pages: Page[];
}

interface IAppModel extends IApp, Document { }

const appSchema = new Schema(
    {
        description: appDescriptionSchema,
        menuItems: [menuItemsSchema],
        pages: [pageSchema]
    }
);

const App = model<IAppModel>("App", appSchema);

export { IApp, App };