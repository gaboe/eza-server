import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";

const ResponseColumnType = new GraphQLObjectType({
    name: "ResponseColumnType",
    fields: {
        columnName: { type: new GraphQLNonNull(GraphQLString) },
        value: { type: new GraphQLNonNull(GraphQLString) },
    }
});

const ResponseRowType = new GraphQLObjectType({
    name: "ResponseRowType",
    fields: {
        columns: { type: new GraphQLList(ResponseColumnType) }
    }
});

const TableQueryResponseType = new GraphQLObjectType({
    name: "TableQueryResponseType",
    fields: {
        rows: { type: new GraphQLList(ResponseRowType) }
    }
});

export { TableQueryResponseType, ResponseRowType, ResponseColumnType };