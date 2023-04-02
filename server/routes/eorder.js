import { Router } from "express";
import { getAllEorder,getEorderById,addEorder,updateEorder,deleteEorder} from "../controllers/eorder-Controllers.js";

const eorderRouter = Router();

eorderRouter.get("/", getAllEorder);
eorderRouter.get("/:id", getEorderById);
eorderRouter.post("/add", addEorder);
eorderRouter.put("/:id", updateEorder);
eorderRouter.post("/delete", deleteEorder);


export default eorderRouter;