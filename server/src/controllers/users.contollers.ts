import { Query, QueryResult } from "pg";
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
        this.client.connect()  
    }

    getUserByNumber = async(Number: string) =>{
        this.number = Number;
        try{
            await this.client.query(`SELECT * FROM users WHERE Number = '${this.number}'`)
            .then((res)=>{this.res.status(200).send(res.rows)})
            .catch((err)=>{this.res.status(500).send(err)})
            
        }
        catch(err: any){
            console.log(err);
            this.res.status(500).json(err);
        }
    }

    getIdUserByNumber = async(Number: string, search: boolean = false) =>{
        this.number = Number;

        try {
            const result = await this.client.query(`SELECT ID FROM users WHERE Number = '${this.number}'`);
            if(!search){
                this.res.status(200).send(result.rows[0]);  
            }
            else{
               return result.rows[0]; 
            }
        } catch (err: any) {
            this.res.status(500).send(err);
            throw err;
        }
    }

    getUser = async(number: string) =>{
        this.number = number;

        await this.client.query(`SELECT Name FROM users WHERE Number = '${this.number}'`)
            .then((result) => {
                if (result.rowCount === 0) {
                this.res.status(404).send("Usuario no encontrado");
                } else {
                this.res.status(200).send("El usuario ya existe");
                }
            })
            .catch((err) => {
                console.log(err);
                this.res.status(500).json(err);
        });
    }

    AddUser = async(name: string, number: string, image: string) =>{
        this.name = name;
        this.number = number;
        this.image = image;

        await this.client.query(`INSERT INTO users(Name, Number, Image) VALUES('${this.name}', '${this.number}', '${this.image}')`)
        .then(()=>{
            this.res.status(200).send("New User Added");
        })
        .catch((err)=>{
            console.log(err);
            
            this.res.status(500).send(err)
        })
    }

    EditNameOfUser = async(Name: string, Number: string) =>{
        this.name = Name;
        this.number = Number;

        await this.client.query(`UPDATE users SET Name = '${this.name}' WHERE Number = '${this.number}'`)
        .then(()=>{
            this.res.status(200).send("User Modify Name");
        })
        .catch((err)=>{
            console.log(err);
            
            this.res.status(500).send(err) 
        })
    }

    AddContact = async(id_user: number, id_add_user: number) =>{
        await this.client.query(`INSERT INTO contacts(Id_user_main, Id_user_add) VALUES(${id_user}, ${id_add_user})`)
        .then(()=>{
            this.res.status(200).send("New Contact Added");
        })
        .catch((err)=>{
            console.log(err);
            if (err.code === "23505") {
                this.res.status(400).send("the data contact exist");
            } else if (err.code === "23514") {
                this.res.status(400).send("you cant add yourselft");
            } else {
                this.res.status(500).json(err);
            } 
        })
    }

    ViewContacts = (number: string) =>{
        this.number = number;
        this.getIdUserByNumber(this.number, true)
        .then(async(res: any)=>{
            
            await this.client.query(`SELECT users.Name, users.Image, users.Number FROM contacts JOIN users ON contacts.Id_user_add = users.ID WHERE contacts.Id_user_main = ${res.id}`)
            .then((res)=>{
                this.res.status(200).json(res.rows)
            })
            .catch((err)=>{
                console.log(err);
                
                this.res.status(500).send(err) 
            })
        })
    }
}