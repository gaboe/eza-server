import { Schema } from "mongoose";

type MenuItem = {
    name: string,
    order: number,
};

const menuItemsSchema = new Schema({
    name: String,
    order: Number
});

export { MenuItem, menuItemsSchema };