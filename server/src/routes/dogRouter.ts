import Router from "express";
import { addDBDogs, DogsDB, getDogById, getDogs } from "../handlers/dogHandler";

const dogRouter = Router()

dogRouter.get("/getDB", DogsDB);
dogRouter.get("/", getDogs);
dogRouter.get("/:id",getDogById);
dogRouter.post("/add", addDBDogs);

export default dogRouter;