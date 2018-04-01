import { GraphQLObjectType, GraphQLNonNull, GraphQLList, GraphQLString } from "graphql";
import { AppType } from "./types/AppType";
import { createApp, addPage } from "../services/AppService";
import { ColumnInputType } from "./inputTypes/ColumnInputType";

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
                columns: {
                    type: new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(ColumnInputType)))
                },
                pageName: {
                    type: new GraphQLNonNull(GraphQLString)
                }
            },
            resolve(_, args) {
                const { columns, pageName } = (args as AddPageArgs);
                return addPage(columns, pageName);
            }
        }
    }
});

type AddPageArgs = {
    columns: Column[],
    pageName: string,
};

export { Mutation };