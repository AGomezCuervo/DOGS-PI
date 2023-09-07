import express from "express";
import router from "./routes/index"
import morgan from "morgan";
import cors from "cors"

const server = express();

server.use(express.json());
server.use(cors());
server.use(morgan("dev"));
server.use("/", router);



export default server;
