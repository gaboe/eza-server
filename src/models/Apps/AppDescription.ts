import { Schema } from "mongoose";

interface IAppDescription {
    name: string;
}

const appDescriptionSchema = new Schema(
    {
        name: String,
    }
);

export { appDescriptionSchema, IAppDescription };