import * as express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express.default();
if (process.env.PORT) {
    const port = process.env.PORT;
    app.set("port", port);
    app.get("/", (_, res) => res.send("This is EZA!"));

    app.listen(port, () => console.log(`Server is running on http://localhost:${port}`));
}
