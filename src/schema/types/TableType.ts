import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { ColumnType } from "./ColumnType";

const TableType = new GraphQLObjectType({
    name: "TableType",
    fields: {
        id: { type: new GraphQLNonNull(GraphQLString) },
        columns: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnType))) }
    }
});
export { TableType };