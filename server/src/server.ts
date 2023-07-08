import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get("/", (req: express.Request, res: express.Response)=>{
    res.send("server of whatsApp-koderx");
})

app.listen(5000, ()=>{
    console.log("Server on port 5000");
    
});