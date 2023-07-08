"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_contollers_1 = __importDefault(require("../controllers/users.contollers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/api/users")
    .get((req, res) => {
    new users_contollers_1.default(req, res).getUsers();
})
    .post((req, res) => {
    const { name, number, image } = req.body;
    new users_contollers_1.default(req, res).AddUser(name, number, image);
});
module.exports = router;
