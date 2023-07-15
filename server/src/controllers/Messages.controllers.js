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
const users_contollers_1 = __importDefault(require("./users.contollers"));
class MessagesController extends connect_1.default {
    constructor(req, res) {
        super();
        this.ViewMessages = (user_em, user_tr) => __awaiter(this, void 0, void 0, function* () {
            this.user_em = user_em;
            this.user_tr = user_tr;
            this.client.query(`SELECT content 
        FROM messages 
        JOIN users ON messages.Id_em = users.ID 
        WHERE (messages.Id_tr = ${this.user_em} OR messages.Id_em = ${this.user_em}) 
          AND (messages.Id_tr = ${this.user_tr} OR messages.Id_em = ${this.user_tr})`)
                .then((res) => {
                this.res.status(200).json(res.rows);
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.SendMessage = (content, user_em, user_tr) => __awaiter(this, void 0, void 0, function* () {
            this.user_em = user_em;
            this.user_tr = user_tr;
            this.client.query(`INSERT INTO messages(content, Id_em, Id_tr) VALUES('${content}', ${this.user_em}, ${this.user_tr})`)
                .then(() => {
                this.res.status(200);
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.ViewMessagesByNumber = (number) => __awaiter(this, void 0, void 0, function* () {
            var us = new users_contollers_1.default(this.req, this.res).getIdUserByNumber(number, true).then((res) => {
                this.client.query(`SELECT messages.Id_em, messages.Id_tr, users.Name, users.Number, users.Image From messages JOIN users ON messages.Id_em = users.ID WHERE messages.Id_tr = ${res.id} OR messages.Id_em = ${res.id}`)
                    .then((res) => {
                    this.res.status(200).json(res.rows);
                })
                    .catch((err) => {
                    console.log(err);
                    this.res.status(500).send(err);
                });
            });
        });
        this.req = req;
        this.res = res;
        this.client.connect();
    }
}
exports.default = MessagesController;
