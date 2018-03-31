import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

const SchemaType = new GraphQLObjectType({
    name: "SchemaType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), }
    }
});

export { SchemaType };