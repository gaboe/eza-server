import * as express from "express";

const app = express.default();

app.set("port", 3000);
app.get("/", (_, res) => res.send("This is EZA!"));

app.listen(3000, () => console.log(`Server is running on http://localhost:3000`));