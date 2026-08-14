import { Router } from "express";
import auth from "../../middleware/auth";
import {
  addOrder,
  getOrder,
  getOrders,
  getProviderOrders,
  updateOrderStatus,
} from "./order.controller";

const orderRouter = Router();

orderRouter.post("/", auth("CUSTOMER"), addOrder);
orderRouter.get("/", auth("CUSTOMER"), getOrders);
orderRouter.get("/orders", auth("PROVIDER"), getProviderOrders);
orderRouter.get("/:id", auth("CUSTOMER"), getOrder);
orderRouter.patch("/orders/:id", auth("PROVIDER"), updateOrderStatus);

export default orderRouter;
