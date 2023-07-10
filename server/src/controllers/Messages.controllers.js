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
class MessagesController extends connect_1.default {
    constructor(req, res, Id_contact) {
        super();
        this.ViewMessages = () => __awaiter(this, void 0, void 0, function* () {
            this.client.query(`SELECT content FROM messages JOIN contacts ON messages.Id_contact = contacts.ID`)
                .then((res) => {
                this.res.status(200).json(res.rows);
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.SendMessage = (content) => __awaiter(this, void 0, void 0, function* () {
            this.client.query(`INSERT INTO messages(content, Id_contact) VALUES('${content}', ${this.Id_contact})`)
                .then(() => {
                this.res.status(200);
            })
                .catch((err) => {
                console.log(err);
                this.res.status(500).send(err);
            });
        });
        this.req = req;
        this.res = res;
        this.Id_contact = Id_contact;
        this.client.connect();
    }
}
exports.default = MessagesController;
