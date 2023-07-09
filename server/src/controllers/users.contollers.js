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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../DB/connect"));
class UsersControllers extends connect_1.default {
    constructor(req, res) {
        super();
        this.getUsers = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.client.query(`SELECT * FROM users`)
                    .then((res) => { this.res.status(200).send(res.rows); })
                    .catch((err) => { this.res.status(500).send(err); });
            }
            catch (err) {
                console.log(err);
                this.res.status(500).json(err);
            }
        });
        this.getUser = (number) => __awaiter(this, void 0, void 0, function* () {
            this.number = number;
            yield this.client.query(`SELECT Name FROM users WHERE Number = '${this.number}'`)
                .then((result) => {
                if (result.rowCount === 0) {
                    this.res.status(404).send("Usuario no encontrado");
                }
                else {
                    this.res.status(200).send("El usuario ya existe");
                }
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).json(err);
            });
        });
        this.AddUser = (name, number, image) => __awaiter(this, void 0, void 0, function* () {
            this.name = name;
            this.number = number;
            this.image = image;
            yield this.client.query(`INSERT INTO users(ID, Name, Number, Image) VALUES(nextval('id_increment'), '${this.name}', '${this.number}', '${this.image}')`)
                .then(() => {
                this.res.status(200).send("New User Added");
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.req = req;
        this.res = res;
        this.client.connect();
    }
}
exports.default = UsersControllers;
