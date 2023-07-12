import UsersControllers from "../controllers/users.contollers";
import { Router, Request, Response } from "express";

const router = Router();

router.route("/api/users/:number")
.get(async(req: Request, res: Response)=>{
    const {number} = req.params
    new UsersControllers(req, res).getUserByNumber(number);
})
.post((req: Request, res: Response)=>{
    const {name, number, image} = req.body;
    new UsersControllers(req, res).AddUser(name, number, image);
})

router.route("/api/users/contact")
.post((req: Request, res: Response)=>{
    const {user_main, user_add} = req.body;
    console.log(user_main);
    
    new UsersControllers(req, res).AddContact(user_main, user_add);
})

router.route("/api/user/:number")
.get((req: Request, res: Response)=>{
    const {number} = req.params;

    new UsersControllers(req, res).getUser(number);
})

.patch((req: Request, res: Response)=>{
    const {Name} = req.body;
    const {Number} = req.params;

    new UsersControllers(req, res).EditNameOfUser(Name, Number);
})

router.route("/api/userid/:number")
.get((req: Request, res: Response)=>{
    const {number} = req.params;

    new UsersControllers(req, res).getIdUserByNumber(number);
})

module.exports = router