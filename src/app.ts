import express, { type Application } from "express";
import config from "./config";
import { notFoundHandler } from "./middleware/not-found";
// import authRouter from "./module/auth/auth.routes";
// import userRouter from "./module/user/user.routes";
// import { notFoundHandler } from "./middleware/not-found";
// import { globalErrorHandler } from "./middleware/global-error";


const app: Application = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(config.NODE_ENV);
app.get("/", async (req, res) => {
  res.send("server is running now");
});

// app.use("/auth", authRouter);
// app.use("/users", userRouter);
// // app.use("/car", ca)


app.use(notFoundHandler);
// app.use(globalErrorHandler);

export default app;

