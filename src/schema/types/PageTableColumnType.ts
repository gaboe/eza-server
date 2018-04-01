import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
const PageTableColumnType = new GraphQLObjectType({
    name: "PageTableColumnTyp",
    fields: {
        dbSchema: { type: new GraphQLNonNull(GraphQLString) },
        table: { type: new GraphQLNonNull(GraphQLString) },
        column: { type: new GraphQLNonNull(GraphQLString) },
    }
});
export { PageTableColumnType };