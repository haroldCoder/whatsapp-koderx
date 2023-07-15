import ConectDB from "../DB/connect";
import { Request, Response } from "express";

class MessagesController extends ConectDB{
    public req: Request;
    public res: Response;
    public user_tr?: number;
    public user_em?: number

    constructor(req: Request, res: Response){
        super();
        this.req = req;
        this.res = res;
        this.client.connect();
    }

    ViewMessages = async(user_em: number, user_tr: number) =>{

        this.user_em = user_em;
        this.user_tr = user_tr;

        this.client.query(`SELECT content FROM messages JOIN users ON messages.user_em = users.ID WHERE messages.user_tr = ${this.user_tr} AND messages.user_em = ${this.user_em}`)
        .then((res)=>{
            this.res.status(200).json(res.rows);
        })
        .catch((err)=>{
            console.log(err);
            
            this.res.status(500).send(err);
        })
    }

    SendMessage = async(content: string, user_em: number, user_tr: number) =>{
        this.user_em = user_em;
        this.user_tr = user_tr;

        this.client.query(`INSERT INTO messages(content, Id_em, Id_tr) VALUES('${content}', ${this.user_em}, ${this.user_tr})`)
        .then(()=>{
            this.res.status(200)
        })
        .catch((err)=>{
            console.log(err);
            
            this.res.status(500).send(err);
        })
    }
}

export default MessagesController;