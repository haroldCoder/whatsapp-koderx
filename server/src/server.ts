import express, {Request, Response} from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { PORT } from './DB/credential';
import ConectDB from './DB/connect';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/server", cors(), require("./routes/users.route"))
app.listen(PORT, ()=>{
    console.log(`Server on port ${PORT}`);
    new ConectDB().isConnect()
});