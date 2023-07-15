"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Messages_controllers_1 = __importDefault(require("../controllers/Messages.controllers"));
const router = (0, express_1.Router)();
router.route("/api/messages/:user_em/:user_tr")
    .get((req, res) => {
    const { user_em, user_tr } = req.params;
    new Messages_controllers_1.default(req, res).ViewMessages(user_em, user_tr);
});
router.route("/api/message")
    .post((req, res) => {
    const { user_em, user_tr, content } = req.body;
    new Messages_controllers_1.default(req, res).SendMessage(content, user_em, user_tr);
});
router.route("/api/messages/:number")
    .get((req, res) => {
    const { number } = req.params;
    new Messages_controllers_1.default(req, res).ViewMessagesByNumber(number);
});
module.exports = router;
