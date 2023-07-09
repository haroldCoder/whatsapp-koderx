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
        try{
           this.client.query(`SELECT * FROM users`)
            .then((result)=>{
                this.res.status(200).json(result.rows);
            })
            .catch((err)=>{
                console.log(err);
                this.res.status(500).json(err);
            }) 
        }
        catch(err: any){
            console.log(err);
            this.res.status(500).json(err);
        }
    }

    getUser = (number: string) =>{
        this.number = number;

        this.client.query(`SELECT Name FROM users WHERE Number = '${this.number}'`)
            .then((result) => {
                if (result.rowCount === 0) {
                this.res.status(500).send("Usuario no encontrado");
                } else {
                this.res.status(200).send("El usuario ya existe");
                }
            })
            .catch((err) => {
                console.log(err);
                this.res.status(500).json(err);
        });
    }

    AddUser = (name: string, number: string, image: string) =>{
        this.name = name;
        this.number = number;
        this.image = image;

        this.client.query(`INSERT INTO users(ID, Name, Number, Image) VALUES(nextval('id_increment'), '${this.name}', '${this.number}', '${this.image}')`)
        .then(()=>{
            this.res.status(200).send("New User Added");
        })
        .catch((err)=>{
            this.res.status(500).send(err)
        })
    }
}