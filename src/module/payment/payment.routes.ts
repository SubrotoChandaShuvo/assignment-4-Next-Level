import { Router } from "express";
import auth from "../../middleware/auth";
import { checkout } from "./payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create/:orderId", auth("CUSTOMER"), checkout);

paymentRouter.post("/confirm", auth("CUSTOMER"), confirmPayment);

paymentRouter.get("/", auth("CUSTOMER"), getPayments);

paymentRouter.get("/:id", auth("CUSTOMER"), getPayment);

export default paymentRouter;
