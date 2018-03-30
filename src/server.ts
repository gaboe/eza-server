import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { Schema } from "./schema/Schema";
const { ApolloEngine } = require("apollo-engine");

dotenv.config();

const app = express.default();
if (process.env.PORT) {
    const port = process.env.PORT;
    app.set("port", port);
    app.get("/", (_, res) => res.send("This is EZA!"));

    // app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));


    app.use("/graphql", bodyParser.json(), graphqlExpress(req => {
        return {
            context: { req: req },
            schema: Schema,
            tracing: true,
            cacheControl: true,
        };
    }));

    app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" })); // if you want GraphiQL enabled

    if (process.env.APOLLO_ENGINE_SECRET) {
        const engine = new ApolloEngine({
            apiKey: process.env.APOLLO_ENGINE_SECRET
        });
        engine.listen({
            port: port,
            expressApp: app,
        }, () => console.log(`Server is running on http://localhost:${port}/graphiql`));
    }
    else {
        console.error(`Missing APOLLO_ENGINE_SECRET from config`);
        process.exit();
    }
}
