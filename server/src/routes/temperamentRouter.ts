import Router from "express";
import { getAllTemperaments } from "../handlers/temperamentHandler";


const temperamentRouter = Router()

temperamentRouter.get("/", getAllTemperaments);

export default temperamentRouter;