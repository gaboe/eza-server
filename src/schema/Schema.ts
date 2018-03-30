import { GraphQLSchema } from "graphql";
import { RootQueryType } from "./types/RootQueryType";

const Schema = new GraphQLSchema({
    query: RootQueryType,
});

export { Schema };
