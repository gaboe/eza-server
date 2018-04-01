import { Schema } from "mongoose";

type MenuItem = {
    name: string,
    rank: number,
};

const menuItemsSchema = new Schema({
    name: String,
    rank: Number
});

export { MenuItem, menuItemsSchema };