import { DB_HOST } from "../DB/credential";
import UsersControllers from "../controllers/users.contollers";
import { Router, Request, Response } from "express";

const router = Router();

router.route("/api/users")
.get(async(req: Request, res: Response)=>{
    new UsersControllers(req, res).getUsers();
})
.post((req: Request, res: Response)=>{
    const {name, number, image} = req.body;
    new UsersControllers(req, res).AddUser(name, number, image);
})

router.route("/api/user/:number")
.get((req: Request, res: Response)=>{
    const {number} = req.params;

    new UsersControllers(req, res).getUser(number);
})

module.exports = router