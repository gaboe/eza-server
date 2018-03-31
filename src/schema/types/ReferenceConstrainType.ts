import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";

const ReferenceConstrainType = new GraphQLObjectType({
    name: "ReferenceConstrainType",
    fields: {
        constrainName: { type: new GraphQLNonNull(GraphQLString), },
        referencedTableName: { type: new GraphQLNonNull(GraphQLString), },
        referencedColumnName: { type: new GraphQLNonNull(GraphQLString), },
        referencingTableName: { type: new GraphQLNonNull(GraphQLString), },
        referencingColumnName: { type: new GraphQLNonNull(GraphQLString), },
    }
});

export { ReferenceConstrainType };