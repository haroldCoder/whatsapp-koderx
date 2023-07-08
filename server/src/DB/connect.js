"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const credential_1 = require("./credential");
class ConectDB {
    constructor() {
        this.isConnect = () => {
            this.client.end()
                .then(() => {
                console.log("Connected DB");
            })
                .catch(() => {
                console.error("Error to closed conection");
            });
        };
        this.client = new pg_1.Client({
            user: credential_1.DB_USER,
            host: credential_1.DB_HOST,
            database: credential_1.DB_NAME,
            password: credential_1.DB_PASSWORD,
            port: credential_1.DB_PORT
        });
    }
}
exports.default = ConectDB;
