import { GraphQLObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const AppDescriptionType = new GraphQLObjectType({
    name: "AppDescriptionType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) }
    }
});

export { AppDescriptionType };