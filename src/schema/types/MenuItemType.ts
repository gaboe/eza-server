import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt } from "graphql";

const MenuItemType = new GraphQLObjectType({
    name: "MenuItemType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString) },
        rank: { type: new GraphQLNonNull(GraphQLInt) }
    }
});
export { MenuItemType };