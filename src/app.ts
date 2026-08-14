import express, { type Application } from "express";
import config from "./config";
import { notFoundHandler } from "./middleware/not-found";
import userRouter from "./module/user/user.routes";
import authRouter from "./module/auth/auth.routes";
import { globalErrorHandler } from "./middleware/global-error";
import gearRouter from "./module/gear/gear.routes";
import orderRouter from "./module/order/order.routes";
import paymentRouter from "./module/payment/payment.routes";
import { webhook } from "./module/payment/payment.controller";

const app: Application = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// console.log(config.NODE_ENV);
app.get("/", async (req, res) => {
  res.send("server is running now");
});

app.use("/api/auth", authRouter);
app.use("/api/admin/users", userRouter);

app.use("/api/gear", gearRouter);
app.use("/api/provider/gear", gearRouter);
app.use("/api/rentalOrders", orderRouter);
app.use("/api/provider", orderRouter);
app.use("/api/payments", paymentRouter);

app.post("/payments/webhook", express.raw({ type: "application/json" }), webhook);

app.use(notFoundHandler);
app.use(globalErrorHandler);

export default app;
