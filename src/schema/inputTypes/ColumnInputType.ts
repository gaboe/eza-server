import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull } from "graphql";

const ColumnInputType = new GraphQLInputObjectType({
    name: "ColumnInputType",
    fields: {
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        name: { type: new GraphQLNonNull(GraphQLString), },
        dataType: { type: new GraphQLNonNull(GraphQLString), },
    }
});

export { ColumnInputType };