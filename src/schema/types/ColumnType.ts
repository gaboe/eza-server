import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
const ColumnType = new GraphQLObjectType({
    name: "ColumnType",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        columnName: { type: new GraphQLNonNull(GraphQLString) },
        tableName: { type: new GraphQLNonNull(GraphQLString) },
        schemaName: { type: new GraphQLNonNull(GraphQLString) },
    }
});

export { ColumnType };