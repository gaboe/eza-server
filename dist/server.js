"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var app = express.default();
app.set("port", 3000);
app.get("/", function (_, res) { return res.send("This is EZA!"); });
app.listen(3000, function () { return console.log("Server is running on http://localhost:3000"); });
