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
const users_contollers_1 = __importDefault(require("../controllers/users.contollers"));
const express_1 = require("express");
const router = (0, express_1.Router)();
router.route("/api/users")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    new users_contollers_1.default(req, res).getUsers();
}))
    .post((req, res) => {
    const { name, number, image } = req.body;
    new users_contollers_1.default(req, res).AddUser(name, number, image);
});
router.route("/api/user/:number")
    .get((req, res) => {
    const { number } = req.params;
    new users_contollers_1.default(req, res).getUser(number);
});
module.exports = router;
