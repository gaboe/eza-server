import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { ColumnType } from "./ColumnType";
import { getColumnsByTableName } from "../../services/ColumnService";
import { Table } from "../../models/Tables/Table";
import { ReferenceConstrainType } from "./ReferenceConstrainType";
import { getReferencedContstraints, getReferencingContstraints } from "../../services/ReferenceConstrainService";

const TableType = new GraphQLObjectType({
    name: "TableType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), },
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        columns: {
            type: new GraphQLNonNull(new GraphQLList(ColumnType)),
            resolve({ name }: Table) {
                return getColumnsByTableName(name);
            }
        },
        referenced: {
            type: new GraphQLNonNull(new GraphQLList(ReferenceConstrainType)),
            resolve({ name }: Table) {
                return getReferencedContstraints(name);
            }
        },
        referencing: {
            type: new GraphQLNonNull(new GraphQLList(ReferenceConstrainType)),
            resolve({ name }: Table) {
                return getReferencingContstraints(name);
            }
        }
    }
});

export { TableType };