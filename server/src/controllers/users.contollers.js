"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../DB/connect"));
class UsersControllers extends connect_1.default {
    constructor(req, res) {
        super();
        this.getUsers = () => {
            try {
                this.client.query(`SELECT * FROM users`)
                    .then((result) => {
                    this.res.status(200).json(result.rows);
                })
                    .catch((err) => {
                    console.log(err);
                    this.res.status(500).json(err);
                });
            }
            catch (err) {
                console.log(err);
                this.res.status(500).json(err);
            }
        };
        this.getUser = (number) => {
            this.number = number;
            this.client.query(`SELECT Name FROM users WHERE Number = '${this.number}'`)
                .then((result) => {
                if (result.rowCount === 0) {
                    this.res.status(500).send("Usuario no encontrado");
                }
                else {
                    this.res.status(200).send("El usuario ya existe");
                }
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).json(err);
            });
        };
        this.AddUser = (name, number, image) => {
            this.name = name;
            this.number = number;
            this.image = image;
            this.client.query(`INSERT INTO users(ID, Name, Number, Image) VALUES(nextval('id_increment'), '${this.name}', '${this.number}', '${this.image}')`)
                .then(() => {
                this.res.status(200).send("New User Added");
            })
                .catch((err) => {
                this.res.status(500).send(err);
            });
        };
        this.req = req;
        this.res = res;
    }
}
exports.default = UsersControllers;
