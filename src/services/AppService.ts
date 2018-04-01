import { App, IApp } from "../models/Apps/App";
import * as shortid from "shortid";

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


const getAppByName = async (name: string) => {
    const app = await App.findOne({ "description.name": name });
    return app;
};

export { createApp, getAppByName };