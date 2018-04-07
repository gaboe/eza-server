import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";

const DbColumnType = new GraphQLObjectType({
    name: "ColumnType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), },
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        position: { type: new GraphQLNonNull(GraphQLInt), },
        dataType: { type: new GraphQLNonNull(GraphQLString), },
    }
});

export { DbColumnType };