import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";

const MenuItemType = new GraphQLObjectType({
    name: "MenuItemType",
    fields: {
        pageCid: { type: new GraphQLNonNull(GraphQLString) },
        name: { type: new GraphQLNonNull(GraphQLString) },
        rank: { type: new GraphQLNonNull(GraphQLInt) }
    }
});
export { MenuItemType };