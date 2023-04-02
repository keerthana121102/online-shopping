import express from "express";
import mongoose from "mongoose";
import userRouter from "./routes/userroute.js";
import empRouter from "./routes/emproute.js";
import norderRouter from "./routes/norder.js";
import eorderRouter from "./routes/eorder.js";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/user", userRouter);
app.use("/emp", empRouter);
app.use("/norder",norderRouter);
app.use("/eorder",eorderRouter);

console.log("Server started")

const url="mongodb://0.0.0.0:27017/void"

mongoose.connect(url)
.then(() =>
app.listen(5000, () =>
  console.log("Connection Succesfull  & Listening to localhost Port 5000")
)
)
.catch((err) => console.log(err));