import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from "graphql";
import { PageTableColumnType } from "./PageTableColumnType";

const PageTableType = new GraphQLObjectType({
    name: "PageTableType",
    fields: {
        columns: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PageTableColumnType))) }
    }
});
export { PageTableType };