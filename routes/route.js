import { Router } from "express";
import { myController } from "../controllers/controller.js";
import { reportQuery } from "../middlewares/reportRequest.js"


const myRouter = Router();

myRouter.get("/joyas", reportQuery, myController.getJewelsWithQueryParams);
myRouter.get("/joyas/filtros", reportQuery, myController.getJewelsWithFilters);

export default myRouter;
