"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Messages_controllers_1 = __importDefault(require("../controllers/Messages.controllers"));
const router = (0, express_1.Router)();
router.route("/api/messages/:id_contact")
    .get((req, res) => {
    const { id_contact } = req.params;
    new Messages_controllers_1.default(req, res, id_contact).ViewMessages();
});
router.route("/api/message")
    .post((req, res) => {
    const { id_contact, content } = req.body;
    new Messages_controllers_1.default(req, res, id_contact).SendMessage(content);
});
module.exports = router;
