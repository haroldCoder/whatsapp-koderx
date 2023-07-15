import { Router, Request, Response } from "express";
import MessagesController from "../controllers/Messages.controllers";

const router = Router();

router.route("/api/messages/:user_em/:user_tr")
.get((req: Request, res: Response)=>{
    const {user_em, user_tr} : number | any = req.params;
    new MessagesController(req, res).ViewMessages(user_em, user_tr)
})

router.route("/api/message")
.post((req: Request, res: Response)=>{
    const {user_em, user_tr,  content} = req.body;

    new MessagesController(req, res).SendMessage(content, user_em, user_tr);
})

router.route("/api/messages/:number")
.get((req: Request, res: Response)=>{
    const {number} = req.params;
    new MessagesController(req, res).ViewMessagesByNumber(number)
})

module.exports = router;