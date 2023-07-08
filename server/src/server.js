"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const credential_1 = require("./DB/credential");
const connect_1 = __importDefault(require("./DB/connect"));
const app = (0, express_1.default)();
const cndb = new connect_1.default();
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
app.use("/server", require("./routes/users.routes"));
app.listen(credential_1.PORT, () => {
    console.log(`Server on port ${credential_1.PORT}`);
    cndb.isConnect();
});
