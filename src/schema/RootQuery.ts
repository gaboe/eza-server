import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { getSchemas } from "../services/SchemaService";
import { SchemaType } from "./types/SchemaType";
import { TableType } from "./types/TableType";
import { getTablesBySchema, getTable } from "../services/TableService";
import { getColumnsByTableName } from "../services/ColumnService";
import { ColumnType } from "./types/ColumnType";
import { AppType } from "./types/AppType";
import { getAppByCid } from "../services/AppService";
import { TableQueryResponseType } from "./types/TableQueryResponseType";
import { getTableQueryResponse } from "../services/TableQueryService";

const RootQuery = new GraphQLObjectType({
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
        table: {
            type: TableType,
            args: {
                tableName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            async resolve(_, args) {
                return getTable((args as TableArgs).tableName);
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
        },
        app: {
            type: AppType,
            args: {
                cid: { type: new GraphQLNonNull(GraphQLString) },
            },
            resolve(_, args) {
                return getAppByCid((args as AppArgs).cid);
            }
        },
        tableQuery: {
            type: TableQueryResponseType,
            args: {
                tableID: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(_, args) {
                return getTableQueryResponse((args as TableQueryArgs).tableID);
            }
        }
    },
});

type TablesArgs = { schemaName: string, };
type TableArgs = { tableName: string, };
type ColumnArgs = { tableName: string, };
type AppArgs = { cid: string, };
type TableQueryArgs = { tableID: string, };

export { RootQuery };