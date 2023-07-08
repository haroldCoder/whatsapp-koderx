import ConectDB from "../DB/connect";
import {Response, Request} from "express"

export default class UsersControllers extends ConectDB{
    public req: Request;
    public res: Response;
    public name?: string;
    public number?: string;
    public image?: string;

    constructor(req: Request, res: Response){
        super();
        this.req = req;
        this.res = res;
    }

    getUsers = () =>{
        this.client.query(`SELECT * FROM users`)
        .then((result)=>{
            this.res.status(200).json(result.rows);
        })
        .catch((err)=>{
            console.log(err);
            this.res.status(500).json(err);
        })
    }

    AddUser = (name: string, number: string, image: string) =>{
        this.name = name;
        this.number = number;
        this.image = image;

        this.client.query(`INSERT INTO users(Name, Number, Image) VALUES('${this.name}', '${this.number}', '${this.image}')`)
        .then(()=>{
            this.res.status(200).send("New User Added");
        })
        .catch((err)=>{
            this.res.status(500).send(err)
        })
    }
}