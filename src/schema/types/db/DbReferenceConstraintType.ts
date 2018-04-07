import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

const DbReferenceConstrainType = new GraphQLObjectType({
    name: "DbReferenceConstrainType",
    fields: {
        constraintName: { type: new GraphQLNonNull(GraphQLString), },
        referencedTableName: { type: new GraphQLNonNull(GraphQLString), },
        referencedSchemaName: { type: new GraphQLNonNull(GraphQLString), },
        referencedColumnName: { type: new GraphQLNonNull(GraphQLString), },
        referencingSchemaName: { type: new GraphQLNonNull(GraphQLString), },
        referencingTableName: { type: new GraphQLNonNull(GraphQLString), },
        referencingColumnName: { type: new GraphQLNonNull(GraphQLString), },
    }
});

export { DbReferenceConstrainType };