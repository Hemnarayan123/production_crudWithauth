import express from 'express'
import cors from 'cors'
import { router, todo } from './routers/index.js';
import path from 'path'



const app = express();

app.use(cors())
app.use(express.json())

//............................code for development................
if(process.env.NODE_ENV === "production"){
    const dirPath = path.resolve();
    app.use(express.static('./Client/dist'));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(dirPath, 'Client/dist/index.html'));
    });
}



app.use("/api/v1", router)
app.use("/api/v2", todo)



export {app}