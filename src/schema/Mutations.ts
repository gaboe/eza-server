import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { AppType } from "./types/AppType";
import { createApp } from "../services/AppService";

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createApp: {
            type: new GraphQLNonNull(AppType),
            resolve() {
                return createApp();
            }
        }
    }

});

export { Mutation };