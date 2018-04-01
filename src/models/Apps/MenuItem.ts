import { Schema } from "mongoose";

type MenuItem = {
    pageCid: string,
    name: string,
    rank: number,
};

const menuItemsSchema = new Schema({
    pageCid: String,
    name: String,
    rank: Number
});

export { MenuItem, menuItemsSchema };