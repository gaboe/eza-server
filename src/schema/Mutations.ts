import { GraphQLObjectType, GraphQLNonNull } from "graphql";
import { AppType } from "./types/AppType";

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createApp: {
            type: new GraphQLNonNull(AppType)
        }
    }
});

export { Mutation };