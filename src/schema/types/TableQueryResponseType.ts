import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";

const ResponseColumnType = new GraphQLObjectType({
    name: "ResponseColumnType",
    fields: {
        columnName: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: GraphQLString },
    }
});

const ResponseRowType = new GraphQLObjectType({
    name: "ResponseRowType",
    fields: {
        key: { type: new GraphQLNonNull(GraphQLString) },
        columns: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ResponseColumnType))) }
    }
});

const TableQueryResponseType = new GraphQLObjectType({
    name: "TableQueryResponseType",
    fields: {
        rows: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ResponseRowType))) },
    }
});

export { TableQueryResponseType, ResponseRowType, ResponseColumnType };