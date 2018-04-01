import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { PageTableColumnType } from "./PageTableColumnType";

const PageTableType = new GraphQLObjectType({
    name: "PageTableType",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        columns: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PageTableColumnType))) }
    }
});
export { PageTableType };