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
        this.getUserByNumber = (Number) => __awaiter(this, void 0, void 0, function* () {
            this.number = Number;
            try {
                yield this.client.query(`SELECT * FROM users WHERE Number = '${this.number}'`)
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
            yield this.client.query(`INSERT INTO users(Name, Number, Image) VALUES('${this.name}', '${this.number}', '${this.image}')`)
                .then(() => {
                this.res.status(200).send("New User Added");
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.EditNameOfUser = (Name, Number) => __awaiter(this, void 0, void 0, function* () {
            this.name = Name;
            this.number = Number;
            yield this.client.query(`UPDATE users SET Name = '${this.name}' WHERE Number = '${this.number}'`)
                .then(() => {
                this.res.status(200).send("User Modify Name");
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.AddContact = (id_user, id_add_user) => __awaiter(this, void 0, void 0, function* () {
            yield this.client.query(`INSERT INTO contacts(Id_main_user, Id_add_user) VALUES(${id_user}, ${id_add_user})`)
                .then(() => {
                this.res.status(200).send("New Contact Added");
            })
                .catch((err) => {
                console.log(err);
                if (err.code === "23505") {
                    this.res.status(400).send("the data contact exist");
                }
                else if (err.code === "23514") {
                    this.res.status(400).send("you cant add yourselft");
                }
                else {
                    this.res.status(500).json(err);
                }
            });
        });
        this.req = req;
        this.res = res;
        this.client.connect();
    }
}
exports.default = UsersControllers;
