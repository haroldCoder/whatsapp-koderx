import ConectDB from "../DB/connect";
import { Request, Response } from "express";
import UsersControllers from "./users.contollers";

class MessagesController extends ConectDB {
  public req: Request;
  public res: Response;
  public user_tr?: number;
  public user_em?: number;

  constructor(req: Request, res: Response) {
    super();
    this.req = req;
    this.res = res;
    this.client.connect();
  }

  ViewMessages = async (user_em: number, user_tr: number) => {
    try {
      this.user_em = user_em;
      this.user_tr = user_tr;
      let queryResult;

      if (this.user_em == this.user_tr) {
        queryResult = await this.client.query(`
              SELECT content, Id_tr, Id_em, number
              FROM messages 
              JOIN users ON messages.Id_em = users.ID 
              WHERE messages.Id_em = ${this.user_em} AND messages.Id_tr = ${this.user_tr} 
            `);
      } else {
        queryResult = await this.client.query(`
          SELECT content, Id_tr, Id_em, number
          FROM messages 
          JOIN users ON messages.Id_em = users.ID 
          WHERE (messages.Id_tr = ${this.user_em} OR messages.Id_em = ${this.user_em}) 
            AND (messages.Id_tr = ${this.user_tr} OR messages.Id_em = ${this.user_tr})
        `);
      }

      const newArray = await Promise.all(
        queryResult.rows.map(async (row: any) => {
          return {
            number_em: row.number,
            content: row.content,
          };
        })
      );

      this.res.status(200).json(newArray);
    } catch (err) {
      console.log(err);
      this.res.status(500).send("Internal Server Error" + err);
    }
  };

  SendMessage = async (content: string, user_em: string, user_tr: string) => {
    this.user_em = await new UsersControllers(
      this.req,
      this.res
    ).getIdUserByNumber(user_em, true);
    this.user_tr = await new UsersControllers(
      this.req,
      this.res
    ).getIdUserByNumber(user_tr, true);

    this.client
      .query(
        `INSERT INTO messages(content, Id_em, Id_tr) VALUES('${content}', ${this.user_em}, ${this.user_tr})`
      )
      .then((res) => {
        this.res.status(200).send("ok");
      })
      .catch((err) => {
        console.log(err);

        this.res.status(500).send(err);
      });
  };

  ViewMessagesByNumber = async (number: string) => {
    var us = new UsersControllers(this.req, this.res)
      .getIdUserByNumber(number, true)
      .then((res: any) => {
        console.log(res);

        this.client
          .query(
            `SELECT 
               MIN(messages.Id_em) AS Id_em,
               MAX(messages.Id_tr) AS Id_tr,
               users.Name,
               users.Number,
               MAX(users.Image) AS Image
           FROM 
               messages
           JOIN 
               users ON 
                   CASE 
                       WHEN messages.Id_em = ${res} THEN messages.Id_tr 
                       ELSE messages.Id_em 
                   END = users.ID
           WHERE 
               messages.Id_tr = ${res} OR messages.Id_em = ${res}
           GROUP BY 
               users.Number, users.Name;`
          )
          .then((res) => {
            this.res.status(200).json(res.rows);
          })
          .catch((err) => {
            console.log(err);

            this.res.status(500).send(err);
          });
      });
  };
}

export default MessagesController;
