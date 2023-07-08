import { Client } from "pg";
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_PORT, DB_USER } from "./credential";

export default class ConectDB{
    client: Client;

    constructor(){
        this.client = new Client({
            user: DB_USER,
            host: DB_HOST,
            database: DB_NAME,
            password: DB_PASSWORD,
            port: DB_PORT
        });
    }
    public isConnect = () =>{
        this.client.end()
        .then(()=>{
            console.log("Connected DB");
        })
        .catch(()=>{
            console.error("Error to closed conection");
        })
    }
}