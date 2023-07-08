import UsersControllers from "../controllers/users.contollers";
import { Router, Request, Response } from "express";

const router = Router();

router.route("/api/users")
.get((req: Request, res: Response)=>{
    new UsersControllers(req, res).getUsers();
})
.post((req: Request, res: Response)=>{
    const {name, number, image} = req.body;
    new UsersControllers(req, res).AddUser(name, number, image);
})

module.exports = router