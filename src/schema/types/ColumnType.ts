import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
const ColumnType = new GraphQLObjectType({
    name: "ColumnType",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        columnName: { type: new GraphQLNonNull(GraphQLString) },
        tableName: { type: new GraphQLNonNull(GraphQLString) },
        schemaName: { type: new GraphQLNonNull(GraphQLString) },
        isFromPrimaryTable: { type: new GraphQLNonNull(GraphQLBoolean), },
        isKey: { type: new GraphQLNonNull(GraphQLBoolean), },
        reference: {
            type: new GraphQLObjectType({
                name: "ColumnReferenceType",
                fields: {
                    primaryKey: { type: new GraphQLNonNull(GraphQLString), },
                    type: { type: new GraphQLNonNull(GraphQLString), },
                }
            })
        }
    }
});

export { ColumnType };