import { Router, Request, Response } from "express";
import MessagesController from "../controllers/Messages.controllers";

const router = Router();

router.route("/api/messages/:id_contact")
.get((req: Request, res: Response)=>{
    const {id_contact} : number | any = req.params;
    new MessagesController(req, res, id_contact).ViewMessages()
})

router.route("/api/message")
.post((req: Request, res: Response)=>{
    const {id_contact, content} = req.body;

    new MessagesController(req, res, id_contact).SendMessage(content);
})

module.exports = router;