import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
const PageTableColumnType = new GraphQLObjectType({
    name: "PageTableColumnTyp",
    fields: {
        dbSchema: { type: new GraphQLNonNull(GraphQLString) },
        dbTable: { type: new GraphQLNonNull(GraphQLString) },
        dbColumn: { type: new GraphQLNonNull(GraphQLString) },
        dbDataType: { type: new GraphQLNonNull(GraphQLString) },
    }
});
export { PageTableColumnType };