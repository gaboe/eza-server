import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLInt, GraphQLBoolean } from "graphql";

const DbColumnType = new GraphQLObjectType({
    name: "DbColumnType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), },
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        position: { type: new GraphQLNonNull(GraphQLInt), },
        dataType: { type: new GraphQLNonNull(GraphQLString), },
        isKey: { type: new GraphQLNonNull(GraphQLBoolean), },
    }
});

export { DbColumnType };