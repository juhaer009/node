import { createServer, IncomingMessage, Server, ServerResponse } from "node:http";
import routeHandler from "./routes/route";
import config from "./config";

const server : Server = createServer((req : IncomingMessage,res : ServerResponse)=>{
    // console.log("Request :",req);
    // console.log("Response :", res);
    routeHandler(req,res);
})

server.listen(config.port,()=>{
    console.log(`server is running on the port ${config.port}`);
})