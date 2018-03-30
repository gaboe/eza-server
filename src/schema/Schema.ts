import { GraphQLSchema } from "graphql";
import { RootQueryType } from "./types/RootQueryType";

const AppSchema = new GraphQLSchema({
    query: RootQueryType,
});
export { AppSchema };
