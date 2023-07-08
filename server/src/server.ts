import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from '../DB/credential';
import ConectDB from '../DB/connect';

const app = express();
const cndb = new ConectDB();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response)=>{
    res.send("server of whatsApp-koderx");
})

app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
    cndb.isConnect();
});