import { GraphQLSchema } from "graphql";
import { RootQuery } from "./RootQuery";
import { Mutation } from "./Mutations";

const AppSchema = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
export { AppSchema };
