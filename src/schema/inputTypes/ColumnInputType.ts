import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean } from "graphql";

const TableInputType = new GraphQLInputObjectType({
    name: "TableInputType",
    fields: {
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        isPrimary: { type: new GraphQLNonNull(GraphQLBoolean), description: "Indicates if this db table is main one in view" },
    }
});

const ColumnInputType = new GraphQLInputObjectType({
    name: "ColumnInputType",
    fields: {
        table: { type: new GraphQLNonNull(TableInputType) },
        name: { type: new GraphQLNonNull(GraphQLString), },
        dataType: { type: new GraphQLNonNull(GraphQLString), },
    }
});


export { ColumnInputType, TableInputType };