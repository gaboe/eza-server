import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { AppDescriptionType } from "./AppDescriptionType";
import { MenuItemType } from "./MenuItemType";
import { PageType } from "./PageType";

const AppType = new GraphQLObjectType({
    name: "AppType",
    fields: {
        cid: { type: new GraphQLNonNull(GraphQLString), },
        description: { type: new GraphQLNonNull(AppDescriptionType) },
        menuItems: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MenuItemType))) },
        pages: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(PageType))) }
    }
});

export { AppType };