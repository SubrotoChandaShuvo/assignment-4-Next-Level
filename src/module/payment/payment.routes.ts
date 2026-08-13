import { Router } from "express";
import auth from "../../middleware/auth";
import { checkout,getPayment,getPayments } from "./payment.controller";

const paymentRouter = Router();

paymentRouter.post("/create/:orderId", auth("CUSTOMER"), checkout);

// paymentRouter.post("/confirm", auth("CUSTOMER"), confirmPayment);

paymentRouter.get("/admin/history", auth("ADMIN"), getPayments);
paymentRouter.get("/:id", auth("CUSTOMER"), getPayment);

// paymentRouter.get("/:id", auth("CUSTOMER"), getPayment);

export default paymentRouter;
