import ConectDB from "../DB/connect";
import { Request, Response } from "express";

class MessagesController extends ConectDB{
    public req: Request;
    public res: Response;
    public Id_contact: number;

    constructor(req: Request, res: Response, Id_contact: number){
        super();
        this.req = req;
        this.res = res;
        this.Id_contact = Id_contact;
        this.client.connect();
    }

    ViewMessages = async() =>{
        this.client.query(`SELECT content FROM messages JOIN contacts ON messages.Id_contact = contacts.ID`)
        .then((res)=>{
            this.res.status(200).json(res.rows);
        })
        .catch((err)=>{
            console.log(err);
            
            this.res.status(500).send(err);
        })
    }

    SendMessage = async(content: string) =>{
        this.client.query(`INSERT INTO messages(content, Id_contact) VALUES('${content}', ${this.Id_contact})`)
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