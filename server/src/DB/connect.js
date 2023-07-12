"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const credential_1 = require("./credential");
class ConectDB {
    constructor() {
        this.isConnect = () => __awaiter(this, void 0, void 0, function* () {
            yield this.client.connect()
                .then(() => {
                console.log("Connected DB");
            })
                .catch((err) => {
                console.error("Error to closed conection", err);
            });
        });
        this.client = new pg_1.Client({
            user: credential_1.DB_USER,
            host: credential_1.DB_HOST,
            database: credential_1.DB_NAME,
            password: credential_1.DB_PASSWORD,
            port: credential_1.DB_PORT,
            ssl: {
                rejectUnauthorized: false
            },
        });
    }
}
exports.default = ConectDB;
