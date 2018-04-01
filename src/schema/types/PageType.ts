import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { PageTableType } from "./PageTableType";

const PageType = new GraphQLObjectType({
    name: "PageType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        table: { type: new GraphQLNonNull(PageTableType) }
    }
});
export { PageType };