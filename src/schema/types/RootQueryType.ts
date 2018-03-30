import { GraphQLObjectType, GraphQLNonNull, GraphQLInt } from "graphql";

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        schamas: {
            type: new GraphQLNonNull(GraphQLInt),
            resolve() {
                return 45;
            }
        }
    }
});

export { RootQueryType };