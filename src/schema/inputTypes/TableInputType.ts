import { GraphQLInputObjectType, GraphQLString, GraphQLNonNull, GraphQLBoolean, GraphQLList } from "graphql";

const ColumnInputType = new GraphQLInputObjectType({
    name: "ColumnInputType",
    fields: {
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        columnName: { type: new GraphQLNonNull(GraphQLString), },
        isFromPrimaryTable: { type: new GraphQLNonNull(GraphQLBoolean), },
        isKey: { type: new GraphQLNonNull(GraphQLBoolean), },
        reference: {
            type: new GraphQLInputObjectType({
                name: "ReferenceInputType",
                fields: {
                    primaryKey: { type: new GraphQLNonNull(GraphQLString), },
                    type: { type: new GraphQLNonNull(GraphQLString), },
                }
            })
        }
    }
});

const TableInputType = new GraphQLInputObjectType({
    name: "TableInputType",
    fields: {
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        tableName: { type: new GraphQLNonNull(GraphQLString), },
        columns: { type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnInputType))) }
    },
    description: "Represents UI table, properties are from main table"
});




export { ColumnInputType, TableInputType };