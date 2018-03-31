import { GraphQLObjectType, GraphQLNonNull, GraphQLList } from "graphql";
import { getSchemas } from "../../services/SchemaService";
import { SchemaType } from "./SchemaType";

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        schemas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SchemaType))),
            async resolve() {
                const schemas = await getSchemas();
                return schemas;
            }
        }
    }
});

export { RootQueryType };