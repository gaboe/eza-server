import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { ColumnType } from "./ColumnType";
import { getColumnsByTableName } from "../../services/ColumnService";
import { DbTable } from "../../models/db/Tables/DbTable";
import { ReferenceConstrainType } from "./ReferenceConstrainType";
import { getReferencedContstraints, getReferencingContstraints } from "../../services/ReferenceConstraintService";

const TableType = new GraphQLObjectType({
    name: "TableType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), },
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        columns: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnType))),
            resolve({ name }: DbTable) {
                return getColumnsByTableName(name);
            }
        },
        referenced: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ReferenceConstrainType))),
            resolve({ name }: DbTable) {
                return getReferencedContstraints(name);
            }
        },
        referencing: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ReferenceConstrainType))),
            resolve({ name }: DbTable) {
                return getReferencingContstraints(name);
            }
        }
    }
});

export { TableType };