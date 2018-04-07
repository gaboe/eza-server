import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { TableType } from "./TableType";

const PageType = new GraphQLObjectType({
    name: "PageType",
    fields: {
        cid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        table: { type: new GraphQLNonNull(TableType) }
    }
});
export { PageType };