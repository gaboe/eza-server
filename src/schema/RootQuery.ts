import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { getSchemas } from "../services/SchemaService";
import { DbSchemaType } from "./types/db/DbSchemaType";
import { TableType } from "./types/db/DbTableType";
import { getTablesBySchema, getTable } from "../services/TableService";
import { getColumnsByTableName } from "../services/ColumnService";
import { DbColumnType } from "./types/db/DbColumnType";
import { AppType } from "./types/AppType";
import { getAppByCid, getAppPreview } from "../services/AppService";
import { TableQueryResponseType } from "./types/TableQueryResponseType";
import { getTableQueryResponse, getTableQueryPreview, } from "../services/TableQueryService";
import { TableInputType } from "./inputTypes/TableInputType";
import { Table } from "../models/app/Tables/Table";

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        schemas: {
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DbSchemaType))),
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
            type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(DbColumnType))),
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
        },
        appPreview: {
            type: AppType,
            args: {
                table: {
                    type: new GraphQLNonNull(TableInputType)
                },
                pageName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(_, args) {
                const { table, pageName } = (args as AppPreview);
                return getAppPreview(table, pageName);
            }
        },
        tableQueryPreview: {
            type: TableQueryResponseType,
            args: {
                table: {
                    type: new GraphQLNonNull(TableInputType)
                }
            },
            async resolve(_, args) {
                const data = await getTableQueryPreview((args as AppPreview).table);
                return data;
            }
        },
    },
});

type TablesArgs = { schemaName: string, };
type TableArgs = { tableName: string, };
type ColumnArgs = { tableName: string, };
type AppArgs = { cid: string, };
type TableQueryArgs = { tableID: string };

type AppPreview = {
    table: Table,
    pageName: string,
};

export { RootQuery };