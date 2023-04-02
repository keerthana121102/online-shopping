import { Router } from "express";
import { getAllNorder,getNorderById,addNorder,updateNorder,deleteNorder} from "../controllers/norder-controllers.js";

const norderRouter = Router();

norderRouter.get("/", getAllNorder);
norderRouter.post("/add", addNorder);
norderRouter.put("/:id", updateNorder);
norderRouter.post("/delete", deleteNorder);
norderRouter.get("/:id", getNorderById);



export default norderRouter;