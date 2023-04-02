import { Router } from "express";
import { getAllEmp, login, getEmpById, getEmployeeUser ,updateProfile,getEorderByEmpId} from "../controllers/emp-controllers.js";

const empRouter = Router();

empRouter.get("/", getAllEmp);
empRouter.get("/:id", getEmpById);
empRouter.post("/login", login);
empRouter.get("/:emp_ids/users", getEmployeeUser);
empRouter.put("/:id", updateProfile);
empRouter.get("/:id/user/eorder",getEorderByEmpId)


export default empRouter;