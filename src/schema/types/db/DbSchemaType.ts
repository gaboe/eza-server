import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

const DbSchemaType = new GraphQLObjectType({
    name: "DbSchemaType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), }
    }
});

export { DbSchemaType };