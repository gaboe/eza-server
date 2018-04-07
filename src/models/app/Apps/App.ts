import { Document, Schema, model } from "mongoose";
import { appDescriptionSchema, IAppDescription } from "./AppDescription";
import { Page, pageSchema } from "./../Pages/Page";
import { MenuItem, menuItemsSchema } from "../MenuItems/MenuItem";

interface IApp {

    cid: string;
    description: IAppDescription;
    menuItems: MenuItem[];
    pages: Page[];
}

interface IAppModel extends IApp, Document { }

const appSchema = new Schema(
    {
        cid: String,
        description: appDescriptionSchema,
        menuItems: [menuItemsSchema],
        pages: [pageSchema]
    }
);

const App = model<IAppModel>("App", appSchema);

export { IApp, App };