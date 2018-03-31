import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { getSchemas } from "../../services/SchemaService";
import { SchemaType } from "./SchemaType";
import { TableType } from "./TableType";
import { getTablesBySchema } from "../../services/TableService";
import { getColumnsByTableName } from "../../services/ColumnService";
import { ColumnType } from "./ColumnType";

const RootQueryType = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        schemas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(SchemaType))),
            async resolve() {
                const schemas = await getSchemas();
                return schemas;
            }
        },
        tables: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(TableType))),
            args: {
                schemaName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(_, args) {
                const tables = await getTablesBySchema((args as TablesArgs).schemaName);
                return tables;
            }
        },
        columns: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnType))),
            args: {
                tableName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(_, args) {
                const columns = await getColumnsByTableName((args as ColumnArgs).tableName);
                return columns;
            }
        }
    },
});

type TablesArgs = { schemaName: string, };
type ColumnArgs = { tableName: string, };

export { RootQueryType };