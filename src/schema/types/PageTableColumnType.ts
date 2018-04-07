import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLBoolean } from "graphql";
const PageTableColumnType = new GraphQLObjectType({
    name: "PageTableColumnType",
    fields: {
        dbColumn: { type: new GraphQLNonNull(GraphQLString) },
        dbDataType: { type: new GraphQLNonNull(GraphQLString) },
        table: {
            type: new GraphQLNonNull(new GraphQLObjectType({
                name: "PageTableColumnTableType",
                fields: {
                    isPrimary: { type: new GraphQLNonNull(GraphQLBoolean) },
                    dbSchemaName: { type: new GraphQLNonNull(GraphQLString) },
                    dbTableName: { type: new GraphQLNonNull(GraphQLString) }
                }
            }))
        }
    }
});

export { PageTableColumnType };