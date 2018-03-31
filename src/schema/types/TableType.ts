import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

const TableType = new GraphQLObjectType({
    name: "TableType",
    fields: {
        name: {
            type: new GraphQLNonNull(GraphQLString),
        },
        schemaName:
            {
                type: new GraphQLNonNull(GraphQLString),
            }
    }
});

export { TableType };