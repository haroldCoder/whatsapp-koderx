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
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use("/server", (0, cors_1.default)(), require("./routes/users.route"));
app.use("/server", (0, cors_1.default)(), require("./routes/messages.route"));
app.listen(credential_1.PORT, () => {
    console.log(`Server on port ${credential_1.PORT}`);
    new connect_1.default().isConnect();
});
module.exports = app;
