import { Router } from "express";
import { getAllUsers,signup,login,getUserById ,getUserNorder,getUserEorder,updateProfile} from "../controllers/user-controllers.js";

const userRouter = Router();

userRouter.get("/",getAllUsers);
userRouter.get("/:id",getUserById);
userRouter.post("/signup",signup);
userRouter.post("/login",login);
userRouter.get("/:user_id/norder", getUserNorder);
userRouter.get("/:user_id/eorder", getUserEorder);
userRouter.put("/:id", updateProfile);


export default userRouter;