import express, { type Application } from "express";
import config from "./config";
import authRouter from "./modules/auth/auth.routes";
import userRouter from "./modules/user/user.routes";
import { notFoundHandler } from "./middleware/not-found";
import { globalErrorHandler } from "./middleware/global-error";
import carRouter from "./modules/car/car.routes";


const app: Application = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(config.NODE_ENV);
app.get("/", async (req, res) => {
  res.send("server is running now");
});

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/car", carRouter);


app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;

