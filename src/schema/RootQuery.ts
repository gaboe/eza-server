import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { getSchemas } from "../services/SchemaService";
import { SchemaType } from "./types/SchemaType";
import { TableType } from "./types/TableType";
import { getTablesBySchema, getTable } from "../services/TableService";
import { getColumnsByTableName } from "../services/ColumnService";
import { ColumnType } from "./types/ColumnType";
import { AppType } from "./types/AppType";
import { getAppByCid, getAppPreview } from "../services/AppService";
import { TableQueryResponseType } from "./types/TableQueryResponseType";
import { getTableQueryResponse, getTableQueryPreview } from "../services/TableQueryService";
import { ColumnInputType } from "./inputTypes/ColumnInputType";
import { ColumnInput } from "../models/Columns/ColumnInput";

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
        },
        appPreview: {
            type: AppType,
            args: {
                columns: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnInputType)))
                },
                pageName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(_, args) {
                const { columns, pageName } = (args as AppPreview);
                return getAppPreview(columns, pageName);
            }
        },
        tableQueryPreview: {
            type: TableQueryResponseType,
            args: {
                columns: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnInputType)))
                }
            },
            async resolve(_, args) {
                const data = await getTableQueryPreview((args as TableQueryPreviewArgs).columns);
                return data;
            }
        },
    },
});

type TablesArgs = { schemaName: string, };
type TableArgs = { tableName: string, };
type ColumnArgs = { tableName: string, };
type AppArgs = { cid: string, };
type TableQueryPreviewArgs = { columns: ColumnInput[], };
type TableQueryArgs = { tableID: string };

type AppPreview = {
    columns: ColumnInput[],
    pageName: string,
};

export { RootQuery };