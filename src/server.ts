import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { Schema } from "./schema/Schema";

dotenv.config();

const app = express.default();
if (process.env.PORT) {
    const port = process.env.PORT;
    app.set("port", port);
    app.get("/", (_, res) => res.send("This is EZA!"));

    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


    app.use("/graphql", bodyParser.json(), graphqlExpress(req => {
        return {
            context: {
                req,
            },
            schema: Schema,
            tracing: true,
            cacheControl: true,
        };
    }));

    app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

}
