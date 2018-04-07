import * as express from "express";
import * as dotenv from "dotenv";
import * as bodyParser from "body-parser";
import cors from "cors";
import { graphqlExpress, graphiqlExpress } from "apollo-server-express";
import { AppSchema } from "./schema/Schema";
const { ApolloEngine } = require("apollo-engine");
// import session from "express-session";
// import mongo from "connect-mongo";
import mongoose from "mongoose";

dotenv.config();

const app = express.default();

(<{ Promise: Function }>mongoose).Promise = global.Promise;
const mongoURL = process.env.MONGOLAB_URI || process.env.MONGODB_URI;

console.log(`\nConnecting to db: ${mongoURL}\n`);

if (mongoURL) {
    mongoose.connect(mongoURL);
}
else {
    console.log(`Missing MONGOLAB_URI or MONGODB_URI from config`);
    process.exit();
}

mongoose.connection.on("error", e => {
    console.log(`MongoDB connection error: ${e}`);
    process.exit();
});

// CORS
const corsOptions = {
    origin: process.env.ALLOWED_CLIENT_ORIGIN,
    optionsSuccessStatus: 200,
    credentials: true
};
app.options("*", cors(corsOptions));
app.use(cors(corsOptions));

// Mongo
// const MongoStore = mongo(session);


if (process.env.PORT) {
    const port = process.env.PORT;
    app.set("port", port);
    app.get("/", (_, res) => res.send("This is EZA!"));


    app.use("/graphql", bodyParser.json(), graphqlExpress(req => {
        return {
            context: { req: req },
            schema: AppSchema,
            tracing: true,
            cacheControl: true,
        };
    }));

    app.get("/graphiql", graphiqlExpress({ endpointURL: "/graphql" }));

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
