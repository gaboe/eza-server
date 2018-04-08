import { GraphQLObjectType, GraphQLNonNull, GraphQLString } from "graphql";
import { AppType } from "./types/AppType";
import { createApp, addPage } from "../services/AppService";
import { TableInputType } from "./inputTypes/TableInputType";
import { Table } from "../models/app/Tables/Table";

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        createApp: {
            type: new GraphQLNonNull(AppType),
            resolve() {
                return createApp();
            }
        },
        addPage: {
            type: new GraphQLNonNull(AppType),
            args: {
                table: {
                    type: new GraphQLNonNull(TableInputType)
                },
                pageName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(_, args) {
                const { table, pageName } = (args as AddPageArgs);
                return addPage(table, pageName);
            }
        }
    }
});

type AddPageArgs = {
    table: Table,
    pageName: string,
};

export { Mutation };