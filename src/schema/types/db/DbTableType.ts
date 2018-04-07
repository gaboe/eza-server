import { GraphQLObjectType, GraphQLNonNull, GraphQLString, GraphQLList } from "graphql";
import { DbColumnType } from "./DbColumnType";
import { getColumnsByTableName } from "../../../services/ColumnService";
import { DbTable } from "../../../models/db/Tables/DbTable";
import { DbReferenceConstrainType } from "./DbReferenceConstraintType";
import { getReferencedContstraints, getReferencingContstraints } from "../../../services/ReferenceConstraintService";

const TableType = new GraphQLObjectType({
    name: "DbTableType",
    fields: {
        name: { type: new GraphQLNonNull(GraphQLString), },
        schemaName: { type: new GraphQLNonNull(GraphQLString), },
        columns: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DbColumnType))),
            resolve({ name }: DbTable) {
                return getColumnsByTableName(name);
            }
        },
        referenced: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DbReferenceConstrainType))),
            async resolve({ name }: DbTable) {
                const referenced = await getReferencedContstraints(name);
                console.log(referenced);
                return referenced;
            }
        },
        referencing: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DbReferenceConstrainType))),
            resolve({ name }: DbTable) {
                return getReferencingContstraints(name);
            }
        }
    }
});

export { TableType };